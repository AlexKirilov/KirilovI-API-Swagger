/**
 * For WebSite Clients authorization ONLY
 * It has to be provide to the WebSite Owner
 *
 * It will identified only:
 * 1. Clients/Customers with level of access - CU
 * 
 */
import { Router } from 'express';
import { validateToken, getSiteID, checkAuthLevelAsAuth } from '../func.js';
import { check, validationResult } from "express-validator";

import Customers from '../models/Customers.js';
import authController from '../controllers/auth/customerAuthCTRL.js';
// import customerController from '../controllers/customerCTRL.js';
// import customerControllerByID from '../controllers/customerByID.js';

const router = Router();
const controller = authController();
const skipDetails = '-__v -GDPR -siteID -password';
// TODO List
/**
 *  AD or SY can update User Details
 *  CU owner can update Details as well
 *   
 *  requires:
 *   siteID
 *   levelAuth
 *   Owner or not func
 */

export function customerAuthRoute() {
  // const controller = customerController();
  // const controllerByID = customerControllerByID();

  // router.use("/", getSiteID, (req, res, next) => {
  //   check("siteID").not().isEmpty().isString();
  //   check("notifyOnReply").toBoolean();

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   } else if (req.siteID) {
  //     return next();
  //   } else {
  //     return res.sendStatus(403);
  //   }
  // });

  // router.use("/:id", validateToken, async (req, res, next) => {
  //   check(req.params.id).not().isEmpty().isString();
  //   check("siteID").not().isEmpty().isString();
  //   check("notifyOnReply").toBoolean();

  //   const editLevel = await Site.findById(req.siteID);

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() });
  //   } else if (req.siteID && req.params.id) {

  //     Customers.findOne({ _id: req.params.id, siteID: req.siteID, authLevel: 'CU' }, skipDetails).exec()
  //       .then((err, customer) => {
  //         if (err) return res.send(err);
  //         req.customer = customer;
  //         if (!customer)  return res.sendStatus(404);
  //         else {
  //           if (
  //             checkAuthLevelAsAuth(editLevel.editProd, req.authLevel) ||
  //             req.authLevel === customer.authLevel
  //           ) {
  //             return next();
  //           } else return res.sendStatus(403);
  //         }
  //       })
  //       .catch((err) => res.status(500).send(err));

  //   } else {
  //     return res.sendStatus(403);
  //   }
  // });

  // router.route('/')
  //   .get(controller.get)                        // Get All customer
  //   .post(controller.post)                     // Add new customer
  //   .delete(controller.remove)                // Delete All

  // router.route('/:id')
  //   .get((req, res) => res.json(req.customer))   // Get customer by id
  //   .put(controllerByID.put)                    // Put customer by id
  //   .patch(controllerByID.patch)               // Update selected customer
  //   .delete(controllerByID.remove)            // Delete selected customer

  // return router;
}
