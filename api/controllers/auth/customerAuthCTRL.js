'use strict';
import Site from '../../models/Site.js';
import Customer from '../../models/Customers.js';
import { compare } from 'bcrypt-nodejs';
// import nodemailer from "nodemailer";
import * as variables from "../../var.js";
import { check, validationResult, body } from "express-validator";
import {
  createToken, refreshToken,
  createConfirmationToken, checkForExistingEmail,
  sendMail, setLogMSG
} from '../../func.js';
// TODO: Page where the Site Owner can update the confirmation email details - Link will remain the same !!!
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
      // setLogMSG("WebSite", 'post', 'error', err, 'customer');
      return res.status(500).json({ error: err });
    });

    if (!siteData) {
      return res.status(404).json({ message: 'No valid entry found for provided Site ID' });
    }

    const userData = await Customer.findOne({ email: loginData.email })
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
          // setLogMSG("WebSite", 'post', 'info', err, 'customer');
          createToken(res, userData, siteData);
        }
      });
    }
  }
};

export async function signUp(req, res) {
  check('email').isEmail().normalizeEmail();
  check('password').isString().trim().isLength({ min: 5 }).escape();
  check('lastname').not().isEmpty().isString().trim().escape();
  check('siteID').isString().trim().isLength({ min: 5, max: 28 }).escape();
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

    try {
      // Create customer account
      const customer = new Customer(req.body);
      customer.levelAuth = 'CU';
      customer.lastLogin = null;
      customer.created = new Date();
      customer.siteID = req.siteID;
      await customer.save();

      // Send the confirm email
      // TODO: Page where the Site Owner can update the confirmation email details
      // Link will remain the same

      const confToken = createConfirmationToken(customer);
      const URI = `${req.protocol}://${req.get('host')}/auth/verify/${confToken}`;

      sendMail(URI, req.body.email, (msg) => {
        return res.status(200).send(msg);
      });

    } catch (err) {
      return res.status(500).send(err);
    }

  }
}

export function tokenRefresh(req, res) {
  return refreshToken(req, res);
}