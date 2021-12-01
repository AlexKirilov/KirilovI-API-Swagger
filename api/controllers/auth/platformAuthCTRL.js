"use strict";
import Site from "../../models/Site.js";
import Auth from "../../models/Auth.js";
import { compare } from "bcrypt-nodejs";
import * as variables from "../../var.js";
import { check, validationResult, body } from "express-validator";
import { sendMail } from "../../mailer/sendMail.js";
import {
  createToken,
  refreshToken,
  createConfirmationToken,
  checkForExistingEmail,
  generatePublicKey,
  setLogMSG,
} from "../../func.js";
/**
 * That Controller will be used ONLY for the Platform purposes
 * The control details will not be include into the clientSwagger
 */

// TODO: Platform Login/Sign - SiteID to be removed from the requirements ---- It`s the PLAT UI

export async function signIn(req, res) {
  check("email").isString().isEmail().normalizeEmail();
  check("password").isString().trim().isLength({ min: 5 }).escape();
  check("company").isString().trim().isLength({ min: 2 }).escape();
  body("notifyOnReply").toBoolean();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const userData = await Auth.findOne({ email: req.email }).select(
      "lastLogin siteID password levelAuth _id lastname firstname active"
    );

    if (!userData)
      return res
        .status(404)
        .send({ message: "There is an issue with provided details" });

    const siteData = await Site.findById(userData.siteID)
      .map((s) => {
        return {
          publicKey: s.publicKey,
          company: s.name,
          _id: s._id,
        };
      })
      .catch((err) => {
        console.log(req.siteID, null, "error", "site", "post", err);
        setLogMSG(req.siteID, null, "error", "site", "post", err);
        return res.status(500).json({ error: err });
      });

    if (!siteData) {
      setLogMSG(
        req.siteID,
        null,
        "warning",
        "signIn",
        "post",
        "No valid entry found for provided Site ID"
      );
      return res
        .status(404)
        .json({ message: "No valid entry found for provided Site ID" });
    } else if (req.company?.toLowerCase() !== siteData.company?.toLowerCase()) {
      setLogMSG(
        req.siteID,
        null,
        "warning",
        "signIn",
        "post",
        `Company name doesn't match with our records`
      );
      return res
        .status(403)
        .json({ message: `Company name doesn't match with our records` });
    }

    if (!userData) {
      return res.status(404).send(variables.errorMsg.notfound);
    } else {
      compare(req.password, userData.password, (err, isMatch) => {
        if (err)
          return res.status(401).send({ message: "Invalid credentials" });
        if (!isMatch) {
          return res.status(401).send({ message: "Invalid credentials" });
        } else {
          if (!userData.active) {
            return res
              .status(402)
              .send({ message: "Email is not confirmed yet." });
          }

          // Updating the last user login date-time
          userData.lastLogin = new Date();
          userData.updateOne(userData, (err, newUser) => {
            if (err) return res.status(500).send();
          });
          setLogMSG(
            req.siteID,
            siteData._id,
            "information",
            "signIn",
            "post",
            `User with ID: ${siteData._id} logged into the platform`
          );
          createToken(res, userData, siteData);
        }
      });
    }
  }
}

export async function signUp(req, res) {
  check("email").isEmail().normalizeEmail();
  check("password").isString().trim().isLength({ min: 5 }).escape();
  check("siteName").not().isEmpty().isString().trim().escape();
  body("notifyOnReply").toBoolean();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const isEmailExist = await checkForExistingEmail(req.body.email);
    // Check for existing email
    if (isEmailExist) {
      return res.status(403).send({ message: "Email already exists" });
    }
    if (!!(await Site.findOne({ name: req.body.siteName }))) {
      return res.status(403).send({ message: "Site name already exists" });
    }
    try {
      // Create WebSite
      const publicKey = generatePublicKey();
      const site = await new Site({
        name: req.body.siteName,
        type: req.body.type,
        publicKey,
      }).save();

      // Create Auth account
      let auth;
      try {
        const authDetails = {};
        authDetails.password = req.body.password;
        authDetails.email = req.body.email;
        authDetails.username = req.body.username;
        authDetails.firstname = req.body.firstname;
        authDetails.lastname = req.body.lastname;
        authDetails.type = req.body.type;
        authDetails.levelAuth = "AD";
        authDetails.lastLogin = null;
        authDetails.siteID = site._id;
        auth = await new Auth(authDetails).save();
      } catch (err) {
        console.log("Err 11 => ", err);
        const s = await Site.findByIdAndDelete(site._id);
        throw err;
      }
      // Send the confirm email
      const confToken = createConfirmationToken(auth);
      // const URI = `${req.protocol}://${req.get('host')}/api/platform/auth/verify/${confToken}`;
      const URI = `${req.protocol}://${req.get("host")}/verifyMe/${confToken}`;

      sendMail(
        "signUp",
        req.body.email,
        URI,
        (msg) => {
          console.log("SITE CREATED -> ", site._id);
          return res.status(200).send(msg);
        },
        async (err) => {
          // On Error delete the account
          console.error(
            "SITE was created, but deleted because of error -> ",
            err
          );
          const s = await Site.findByIdAndDelete(site._id);
          const a = await Auth.findByIdAndDelete(auth._id);
          return res.status(500).send({
            message:
              "There was an issue sending the email, account details were deleted. If the issue occur again contact with your administrator!",
          });
          // Site.findByIdAndDelete(site._id).then(
          //   (s) => {
          //     console.log('Side Delete => ', s)
          //     Auth.findByIdAndDelete(auth._id).then(() => {
          //       console.log("account was deleted");
          //       return res.status(500).send({
          //         message:
          //           "There was an issue sending the email, account details were deleted. If the issue occur again contact with your administrator!",
          //       });
          //     });
          //   }
          // );
        }
      );
    } catch (err) {
      setLogMSG(null, null, "fatal", "signUp", "post", err);
      return res.status(500).send(err);
    }
  }
}

export function tokenRefresh(req, res) {
  return refreshToken(req, res);
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
