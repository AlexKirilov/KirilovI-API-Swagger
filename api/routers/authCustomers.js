/**
 * For PLATFORM usage ONLY
 * Do not share with the Owners !!!
 * 
 * It will identified only:
 * 1. System Admins
 * 2. Admins - Site Owners
 * 3. Employees
 */
import { Router } from 'express';
import { validateToken, signInBase64Encoding } from "../func.js";
import { check, validationResult } from "express-validator";
import Customers from "../models/Customers.js";

import {
  signIn, tokenRefresh,
  signUp, 
  // passReset,
  // verifyPassReset
} from "../controllers/auth/customerAuthCTRL.js";
import customerAuthByID from "../controllers/auth/customerAuthByID.js";

const router = Router();
const skipDetails = '-__v -siteID -password -company -created -lastLogin -cryptoKey -type -active -levelAuth';

export function customerAuthRouter() {
  const userController = customerAuthByID();

  router.route('/sign-in', signInBase64Encoding).post(signIn);
  router.route('/refresh').post(tokenRefresh);
  router.route('/sign-up').post(signUp);
  // router.route('/reset').post(passReset);
  // router.route('/verify-pass').post(verifyPassReset);

  router.use("/:id", validateToken, async (req, res, next) => {
    check(req.params.id).not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    // ID`s must match completely to continue
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.params.id === req.userId) {
      Customers.findOne(
        { _id: req.params.id, siteID: req.siteID }, 
        skipDetails
        ).exec()
        .then((user, err) => {
          req.user = user;
          if (err) return res.send(err);
          if (!user) return res.sendStatus(404);
          else return next();
        })
        .catch((err) => res.status(500).send(err));
    } else {
      return res.sendStatus(403);
    }
  });


  router.route('/:id')
    .get((req, res) => res.json(req.user))       // Get user data by id
    .put(userController.put)                    // Put user data by id
    .patch(userController.patch)               // Update selected user
    .delete(userController.remove)            // Delete selected user

  return router;
}
