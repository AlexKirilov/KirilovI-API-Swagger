import { Router } from 'express';
import { check, validationResult } from "express-validator";
import { validateToken, checkAuthLevelAsAuth } from '../func.js';

import Customers from "../models/Customers.js";
import employeeController from '../controllers/employeeCTRL.js';
import employeeControllerByID from '../controllers/employeeByID.js';

const router = Router();
const skipDetails = '-__v -GDPR -siteID -password -company';

// TODO List
/**
 * Variable to distinguish the main UI platform and the Client Websites
 */
export function employeeRoute() {
  const controller = employeeController();
  const controllerByID = employeeControllerByID();

  router.use("/", validateToken, async (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (
      req.siteID &&
      checkAuthLevelAsAuth(req.siteID, req.authLevel)
    ) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });

  router.use("/:id", validateToken, async (req, res, next) => {
    check(req.params.id).not().isEmpty().isString();
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (
      req.siteID &&
      req.params.id &&
      checkAuthLevelAsAuth(req.siteID, req.authLevel
      )
    ) {
      Customers.findOne({ _id: req.params.id, siteID: req.siteID }, skipDetails).exec()
        .then((employee, err) => {
          if (err) return res.send(err);
          req.employee = employee;
          if (!employee) return res.sendStatus(404);
          else return next();
        })
        .catch((err) => res.status(500).send(err));
    } else {
      return res.sendStatus(403);
    }
  });


  router.route('/')
    .get(controller.get)                        // Get All employed
    .post(controller.post)                     // Add new employee
    .delete(controller.remove)                // Delete All

    router.route('/:id')
    .get((req, res) => res.json(req.employee))   // Get employee by id
    .put(controllerByID.put)                    // Put employee by id
    .patch(controllerByID.patch)               // Update selected employee
    .delete(controllerByID.remove)            // Delete selected employee

  return router;
}
