'use strict';
import Site from '../../models/Site.js';
import Auth from '../../models/Auth.js';
import { compare } from 'bcrypt-nodejs';
// import nodemailer from "nodemailer";
import * as variables from "../../var.js";
import { check, validationResult, body } from "express-validator";
import {
  createToken, refreshToken,
  createConfirmationToken, checkForExistingEmail,
  generatePublicKey, sendMail, setLogMSG
} from '../../func.js';

// TODO: Add active check if not send new email with confirmation message and url
export async function signIn(req, res) {
  check('email').isString().isEmail().normalizeEmail();
  check('password').isString().trim().isLength({ min: 5 }).escape();
  check('siteID').isString().trim().isLength({ min: 5, max: 28 }).escape();
  body('notifyOnReply').toBoolean();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const loginData = req.body;

    const siteData = await Site.findById(loginData.siteID).map(s => {
      return {
        publicKey: s.publicKey,
        _id: s._id
      }
    }).catch(err => {
      setLogMSG("Platform", 'post', 'error', err, 'platform');
      return res.status(500).json({ error: err });
    });

    if (!siteData) {
      return res.status(404).json({ message: 'No valid entry found for provided Site ID' });
    }

    const userData = await Auth.findOne({ email: loginData.email })
    .select('lastLogin siteID password levelAuth _id lastname firstname active')

    if (!userData) {
      return res.status(404).send(variables.errorMsg.notfound);
    } else {
      compare(loginData.password, userData.password, (err, isMatch) => {
        if (err) return res.status(500).send(err);
        if (!isMatch) {
          return res.status(401).send(variables.errorMsg.unauthorized);
        } else {
          if (!userData.active) {
            return res.status(402).send('Email is not confirmed yet.');
          }

          // Updating the last user login date-time
          userData.lastLogin = new Date();
          userData.updateOne(userData, (err, newUser) => {
            if (err) return res.status(500).send(variables.errorMsg.update);
          });
          setLogMSG("Platform", 'post', 'info', err, 'platform');
          createToken(res, userData, siteData);
        }
      });
    }
  }
};

export function tokenRefresh(req, res) {
  return refreshToken(req, res);
}

export async function signUp(req, res) {
  check('email').isEmail().normalizeEmail();
  check('password').isString().trim().isLength({ min: 5 }).escape();
  check('siteName').not().isEmpty().isString().trim().escape();
  body('notifyOnReply').toBoolean();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const isEmailExist = await checkForExistingEmail(req.body.email);
    // Check for existing email
    if (isEmailExist) {
      return res.status(403).send({ message: 'Email already exists' });
    }
    if (!!await Site.findOne({ name: req.body.siteName })) {
      return res.status(403).send({ message: 'Site name already exists' });
    }
    try {
      // Create WebSite
      const publicKey = generatePublicKey();
      const site = await new Site({ name: req.body.siteName, publicKey }).save();

      // Create Auth account
      const auth = new Auth(req.body);
      auth.levelAuth = 'AD';
      auth.lastLogin = auth.created = new Date();
      auth.siteID = site._id;
      await auth.save();

      // Send the confirm email
      const confToken = createConfirmationToken(auth);
      const URI = `${req.protocol}://${req.get('host')}/platform/auth/verify/${confToken}`;

      sendMail(URI, req.body.email, (msg) => {
        return res.status(200).send(msg);
      });

    } catch (err) {
      return res.status(500).send(err);
    }

  }
}



export function passReset(req, res) {
  // validate income data
  // validate income email for existing one
  // send email with reset token btn
}

export function verifyPassReset(req, res) {
  // verify the income data
  // verify the new password
  // update the user password
  // send confirmation email for the reset password
}

export function deleteUser(req, res) {
  // For testing purposes only
}