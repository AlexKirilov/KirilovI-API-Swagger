'use strict';
import { Router } from 'express';
import { validateConfirmationToken, getSiteID, validateEmail } from "../func.js";
import { check, validationResult } from "express-validator";
import authAuthByID from "../controllers/auth/verifyAuthByIDCTRL.js";

const router = Router();

export function verifyAuthRoute() {
  const controller = authAuthByID();

  router.use("/token/:token", validateConfirmationToken, (req, res, next) => {
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req._id) {
      return next();
    } else {
      return res.status(500);
    }
  });

  router.use("/email/:email", getSiteID, (req, res, next) => {
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    const email = req.params.email;
    const isEmailValid = validateEmail(email);
    if (!email || !isEmailValid)
      return res.status(403).send(
        {
          message: `Email validation failed - ${!isEmailValid ?
            'Invalid format'
            : 'Provided details were not enough to verify'}`
        });
    else req.email = email;

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.email) {
      return next();
    } else {
      return res.status(500);
    }
  });

  router.use("/websiteName/:name", getSiteID, (req, res, next) => {
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    const name = req.params.name;

    if (!name || name.length === 0) {
      return res.status(403).send({ message: 'Provide the website name' });
    } else req.name = name;

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.name) {
      return next();
    } else {
      return res.status(500).send();
    }
  });

  router.route('/token/:token').get(controller.verify);
  router.route('/email/:email').get(controller.email);
  router.route('/websiteName/:name').get(controller.websiteName);

  return router;
}
