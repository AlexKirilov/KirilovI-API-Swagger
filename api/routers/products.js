const func = require('../func');
const express = require('express');
const productRoute = express.Router();
const { check, validationResult } = require("express-validator");

const productController = require('../controllers/products');
const productControllerByID = require('../controllers/productsByID');

function routes() {
  const Products = require('../models/Products');
  const controller = productController(Products);
  const controllerByID = productControllerByID(Products);

  productRoute.use('/', func.getSiteID, (req, res, next) => {
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

  productRoute.route('/')
  .get(controller.get)
  .post(func.checkAuthenticated, controller.post)
  .delete(func.checkAuthenticated, controller.remove);

  productRoute.use('/:id', func.getSiteID, (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.params.id && req.siteID) {
      Products.findOne({ _id: req.params.id, siteID: req.siteID }).exec().then( (err, product) => {
        if (err) return res.send(err);
        req.product = product;
        if (!product) return res.sendStatus(404);
        else return next();
      });
    } else {
      return res.sendStatus(403);
    }
  });

  productRoute.route('/:id')
    .get((req, res) => res.json(req.product))
    .put(func.checkAuthenticated, controllerByID.put)
    .patch(func.checkAuthenticated, controllerByID.patch)
    .delete(func.checkAuthenticated, (req, res) => {
        check("userId").not().isEmpty().isString();
        check("authLevel").not().isEmpty().isString().isLength({ min: 2, max: 3 });

        if (!req.userId || !req.authLevel) {
          return res.sendStatus(403);
        } else {
          return controllerByID.remove(req, res);
        }
      }
    );

  return productRoute;
}

module.exports = routes();