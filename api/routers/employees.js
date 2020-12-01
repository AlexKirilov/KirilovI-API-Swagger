const func = require('../func');
const express = require('express');
const employeeRoute = express.Router();
const employeeController = require('../controllers/employeeCTRL');
const employeeControllerByID = require('../controllers/employeeByID');
const { check, validationResult } = require("express-validator");

const skipDetails = '-__v -GDPR -siteID -password -company';

function routes() {
  const Site = require('../models/Site');
  const Customers = require('../models/Customers');
  const controller = employeeController(Customers);
  const controllerByID = employeeControllerByID(Customers);

  employeeRoute.use("/", func.checkAuthenticated, async (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const editLevel = await Site.findById(req.siteID);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (
      req.siteID &&
      func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)
    ) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });

  employeeRoute.use("/:id", func.checkAuthenticated, async (req, res, next) => {
    check(req.params.id).not().isEmpty().isString();
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const editLevel = await Site.findById(req.siteID);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (
      req.siteID &&
      req.params.id &&
      func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel
      )
    ) {
      Customers.findOne({ _id: req.params.id, siteID: req.siteID }, skipDetails).exec().then((err, employee) => {
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


  employeeRoute.route('/')
    .get(controller.get)                        // Get All employes
    .post(controller.post)                     // Add new employee
    .delete(controller.remove)                // Delete All

  employeeRoute.route('/:id')
    .get((req, res) => res.json(req.employee))                 // Get employee by id
    .put(controllerByID.put)
    .patch(controllerByID.patch)               // Update selected employee
    .delete(controllerByID.remove)            // Delete selected employee

  return employeeRoute;
}

module.exports = routes();