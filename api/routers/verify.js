'use strict';
import { Router } from 'express';
import { validateConfirmationToken } from "../func.js";
import { check, validationResult } from "express-validator";
import authAuthByID from "../controllers/auth/verifyAuthByIDCTRL.js";

const router = Router();

export function verifyAuthRoute() {
  const controller = authAuthByID();

  router.use("/:token", validateConfirmationToken, (req, res, next) => {
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

  router.route('/:token').get(controller.verify);

  return router;
}
