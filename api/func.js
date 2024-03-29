import jsonwebtoken from 'jsonwebtoken';
import { variables } from "./var.js";

import Site from './models/Site.js';
import Auth from "./models/Auth.js";
import Logs from "./models/Logs.js";
import Customers from "./models/Customers.js";
import nodemailer from "nodemailer";

const authLevelAsNum = { // enums
  "GU": 0,
  "CU": 1,
  "EE": 2,
  "MN": 3,
  "AD": 4,
  "SA": 5,
};

export function createConfirmationToken(user) {
  const minutes = 30; // expires after minutes
  return jsonwebtoken.sign(
    {
      exp: new Date().getTime() + minutes * 60 * 1000,
      _id: `${user._id}`,
      email: `${user.email}`
    },
    process.env.CONF_KEY
  );
};

export function validateConfirmationToken(req, res, next) {
  try {
    const token = req.params.token;
    // const payload = 
    const payload = jsonwebtoken.verify(token, process.env.CONF_KEY, (err, conf) => {
      if (err !== undefined && err !== null) {
        return res.sendStatus(500).send(err);
      } else if (new Date().getTime() >= conf.exp) {
        const tokenData = jsonwebtoken.decode(token);
        const confToken = createConfirmationToken(tokenData);
        const newVerifyLink = `${req.protocol}://${req.get('host')}/api/platform/auth/verify/${confToken}`;
        const deleteLink = `${req.protocol}://${req.get('host')}/api/platform/auth/delete/${confToken}`;
        const expDate = new Date(tokenData.exp).toLocaleString().toString();

        // return res.send(resentHTML(expDate, newVerifyLink, deleteLink));
        return res.status(404).send({ expDate, newVerifyLink, deleteLink });
      } else {
        req._id = conf._id;
        req.email = conf.email;
        req.params._id = conf._id;
        req.params.email = conf.email;

        next();
      }
    });
  } catch (err) {
    return res.status(401).send(err);
  }
};

export function createToken(res, user, siteData) {
  const minutes = 60;
  const encrKey = variables.masterKey + siteData.publicKey + user.levelAuth;
  const token = jsonwebtoken.sign({
    exp: new Date().getTime() + minutes * 60 * 1000,
    key: `${siteData.publicKey}`,
    u_id: `${user._id}`,
    s_id: `${siteData._id}`,
    lvl: `${user.levelAuth}`
  }, encrKey);

  return res.status(200).send({
    token: `Bearer ${token}`,
    username: user.username || (user.lastname.trim() == "" || user.lastname === null) ? user.firstname : user.lastname
  });
};

export function validateToken(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send(variables.errorMsg.unauthorized);
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenData = jsonwebtoken.decode(token);
    const decryptKey = variables.masterKey + tokenData.key + tokenData.lvl;

    const payload = jsonwebtoken.verify(token, decryptKey)
    if (!payload)
      return res.status(401).send(variables.errorMsg.unauthorized);

    req.userId = payload.u_id;
    req.siteID = tokenData.s_id;
    req.authLevel = tokenData.lvl;
    next();

  } catch (err) {
    return res.status(401).send(variables.errorMsg.unauthorized);
  }
}

export function refreshToken(req, res) {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const tokenData = jsonwebtoken.decode(token);
    const encrKey = variables.masterKey + tokenData.key + tokenData.lvl;

    jsonwebtoken.verify(token, encrKey);

    const newToken = jsonwebtoken.sign({
      key: `${tokenData.key}`,
      u_id: `${tokenData.u_id}`,
      s_id: `${tokenData.s_id}`,
      lvl: `${tokenData.lvl}`
    }, encrKey, { expiresIn: '1h' });
    return res.status(200).send({ token: `Bearer ${newToken}` });
  } catch (err) {
    return res.status(500).send(err);
  }
}

export function validateEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export async function checkForExistingEmail(email) {
  const auth = await Auth.findOne({ email: { $regex: new RegExp(email, "i") } });
  const customer = await Customers.findOne({ email: { $regex: new RegExp(email, "i") } });
  return !!auth || !!customer;
}

export function onCatchCreateLogMSG(err) {
  let msg = "";
  if (err && err.errors && err.errors.msg && err.errors.param) {
    if (err.errors.length > 1) {
      msg += `${err.errors.msg} - ${err.errors.param}`;
    } else {
      msg = `${err.errors.msg} - ${err.errors.param}`;
    }
  } else if (err && err.error) {
    msg = err.error;
  } else if (err && err.message) {
    msg = err.message;
  }
  return msg || "";
}

export function checkObjectProperties(obj, propertyList) {
  const missing = [];
  propertyList.forEach(key => {
    if (!obj[key]) missing.push(key);
  });

  return missing && missing.length ? missing : false;
}

export function convertSort(sortColumn) {
  if (typeof sortColumn !== "object") {
    let sort = {};
    sortColumn.split(",").forEach(element => {
      let tmpEl = element.toString().toLowerCase();
      if (tmpEl.indexOf("desc") !== -1) {
        sortColumn.indexOf("desc") !== -1
          ? (sortColumn = sortColumn.split("desc"))
          : (sortColumn = sortColumn.split("Desc"));
        sortColumn.pop();
        sort[sortColumn.toString()] = "desc";
      } else {
        sort[sortColumn] = "asc";
      }
      sortColumn = sort;
    });
  } else {
  }
  return sortColumn;
}

// Deprecated function
export async function checkAuthLevelAsAuth(siteID, userLevel) {
  const editLevel = await Site.findById(siteID);
  return authLevelAsNum[editLevel] <= authLevelAsNum[userLevel];
}

export function verifyLvlOfAuth(userLevel, minLvl) {
  return authLevelAsNum[minLvl] <= authLevelAsNum[userLevel];
}

export function getSiteID(req, res, next) {

  if (!req.headers.siteid)
    return res.status(401).send(variables.errorMsg.unauthorized);

  req.siteID = req.headers.siteid;
  next();
}

export function generatePublicKey() {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#£$%*()";
  let key = "";
  for (let i = 0; i < 6; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

export function signInBase64Encoding(req, res, next) {
  if (!req.headers.siteid || (!req.params && !req.params.base))
    return res.status(401).send({ message: "Invalid credentials" });

  const buff = new Buffer.from(req.params.base, 'base64');
  const params = JSON.parse(buff.toString('ascii'));

  if (!validateEmail(params.email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  req.email = params.email;
  req.company = params.company;
  req.password = params.password;
  req.siteID = req.headers.siteid;
  console.log(req.siteID, params)
  next()
}

/*
* @param {'Information' | 'Warning' | 'Error' | 'Fatal' } level
* @param {'Product' | 'Customer' | 'Invoices' | any } logType
* @param {'post' | 'get' | 'delete' | 'put' | 'patch' } requestType
*
*/
export function setLogMSG(siteID, customerID, level, logType, requestType, err) {
  const date = new Date();
  new Logs({
    expireAt: date.setMonth(date.getMonth() + 1),
    siteID,
    customerID,
    isUI: false,
    logType,
    level,
    message: onCatchCreateLogMSG(err),
    requestType
  }).save();
}

const func = {
  resetPassCheck(req, res, next) {
    if (Object.keys(req.body.data).length == 0)
      return res.status(402).send(variables.errorMsg.unauthorized);
    try {
      const loginData = req.body.data;
      let token = loginData.cid; // [0] removing the 'token' string
      let siteData = loginData.sd.split("-"); // [0] LevelOfAuth + [1] Public Key
      let siteID = loginData.sid;
      let levelOfAuth = siteData[0]; //SA, AD, MN, CU
      let publicKey = siteData[1];
      let decryptKey = variables.masterKey + publicKey + levelOfAuth;

      let payload = decode(token, decryptKey);

      if (!payload)
        return res.status(403).send(variables.errorMsg.unauthorized);

      req.decryptKey = decryptKey;
      req.userId = payload.sub;
      req.siteID = siteID;
      req.authLevel = levelOfAuth;
      next();
    } catch (err) {
      return res.status(404).send(variables.errorMsg.unauthorized);
    }
  }
};

export default func;
