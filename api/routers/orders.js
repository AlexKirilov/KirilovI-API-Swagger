import { getSiteID, validateToken } from '../func.js';
import { Router } from 'express';
import { check, validationResult } from "express-validator";

import Orders from "../models/Orders.js";
import ordersController from '../controllers/ordersCTRL.js';
import ordersControllerByID from '../controllers/ordersByID.js';

const router = Router();
let skipDetails = '-__v -siteID ';
// TODO List
/**
 *  Only EE or higher can update Orders data
 *  All levels can get Order
 * 
 *  requires siteID to be provided on 100%;
 */

export function ordersRoute() {
  const controller = ordersController();
  const controllerByID = ordersControllerByID();

  router.route('/')
    .get(validateToken, controller.get)
    .post(validateToken, controller.post)
    .delete(validateToken, controller.remove);

  router.use('/:id', validateToken, (req, res, next) => {
    check("notifyOnReply").toBoolean();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.params.id && req.siteID) {

      if (req.authLevel === 'CU')
        skipDetails += '-handlerID -customerID -createDate -orderDate -canceledDate -approvedDate -sendForDeliveryDate -deliveredDate'

      Orders.findOne({ _id: req.params.id, siteID: req.siteID }, skipDetails).exec()
        .then((order, err) => {
          if (err) return res.status(500).send(err);
          req.order = order;
          if (!order) return res.sendStatus(404);
          else return next();
        })
        .catch((err) => res.status(500).send(err));
    } else {
      return res.sendStatus(403);
    }
  });

  router.route('/:id')
    .get((req, res) => res.json(req.order))
    // .put(validateToken, controllerByID.put)
    .patch(validateToken, controllerByID.patch)
    .delete(validateToken, (req, res) => {
      check("userId").not().isEmpty().isString();
      check("authLevel").not().isEmpty().isString().isLength({ min: 2, max: 3 });

      if (!req.userId || !req.authLevel) {
        return res.sendStatus(403);
      } else {
        return controllerByID.remove(req, res);
      }
    });

  return router;
}