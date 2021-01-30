import { getSiteID, validateToken } from '../func.js';
import { Router } from 'express';
import { check, validationResult } from "express-validator";

import Products from "../models/Products.js";
import productController from '../controllers/productCTRL.js';
import productControllerByID from '../controllers/productByID.js';

const router = Router();
const skipDetails = '-__v -siteID ';
// TODO List
/**
 *  Only EE or higher can update products data
 *  All levels can get Product
 * 
 *  requires siteID to be provided on 100%;
 */

export function productRoute() {
  const controller = productController();
  const controllerByID = productControllerByID();

  router.route('/')
    .get(getSiteID, controller.get)
    .post(validateToken, controller.post)
    .delete(validateToken, controller.remove);

  router.use('/:id', getSiteID, (req, res, next) => {
    check("notifyOnReply").toBoolean();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.params.id && req.siteID) {
      Products.findOne({ _id: req.params.id, siteID: req.siteID }, skipDetails).exec()
        .then((product, err) => {
          if (err) return res.status(500).send(err);
          req.product = product;
          if (!product) return res.sendStatus(404);
          else return next();
        })
        .catch((err) => res.status(500).send(err));
    } else {
      return res.sendStatus(403);
    }
  });

  router.route('/:id')
    .get((req, res) => res.json(req.product))
    .put(validateToken, controllerByID.put)
    .patch(validateToken, controllerByID.patch)
    .delete(validateToken, (req, res) => {
      check("userId").not().isEmpty().isString();
      check("authLevel").not().isEmpty().isString().isLength({ min: 2, max: 3 });

      if (!req.userId || !req.authLevel) {
        return res.sendStatus(403);
      } else {
        return controllerByID.remove(req, res);
      }
    }
    );

  return router;
}