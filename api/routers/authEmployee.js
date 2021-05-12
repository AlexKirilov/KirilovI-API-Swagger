/**
 * For site employees authorization ONLY
 * It has to be provide to the WebSite Owner
 *
 * It will identified only:
 * 1. Admin - Site Owner
 * 2. Managers
 * 3. Employees
 * 
 */
'use strict';
import { Router } from 'express';
import { check, validationResult } from "express-validator";
import authController from "../controllers/auth/employeeAuthCTRL.js";
import { getSiteID } from "../func.js";

const router = Router();
const controller = authController();
const skipDetails = '-__v -GDPR -siteID -password';

export function employeeAuthRoute() {

  router.use("/", getSiteID, (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.siteID) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });

  // router.use("/:id", validateToken, async (req, res, next) => {
  //   check(req.params.id).not().isEmpty().isString();
  //   check("siteID").not().isEmpty().isString();
  //   check("notifyOnReply").toBoolean();

  //   const editLevel = await Site.findById(req.siteID);

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   } else if (req.siteID && req.params.id) {

  //     // Customers.findOne({ _id: req.params.id, siteID: req.siteID, authLevel: 'CU' }, skipDetails).exec()
  //     //   .then((err, customer) => {
  //     //     if (err) return res.send(err);
  //     //     req.customer = customer;
  //     //     if (!customer)  return res.sendStatus(404);
  //     //     else {
  //     //       if (
  //     //         checkAuthLevelAsAuth(editLevel.editProd, req.authLevel) ||
  //     //         req.authLevel === customer.authLevel
  //     //       ) {
  //     //         return next();
  //     //       } else return res.sendStatus(403);
  //     //     }
  //     //   })
  //     //   .catch((err) => res.status(500).send(err));

  //   } else {
  //     return res.sendStatus(403);
  //   }
  // });

  router.route('/sign-in').post(controller.login);
  router.route('/sign-up').post(controller.signUp);
  router.route('/:id').delete(controller.remove);

  return router;
}
