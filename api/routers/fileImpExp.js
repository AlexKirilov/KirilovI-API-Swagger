// File Importer / Exporter router
const func = require('../func');
const express = require('express');
const fileRouter = express.Router();
const { check, validationResult } = require("express-validator");

const fileController = require('../controllers/fileImportExport');

function routes() {
  // const Products = require('../models/Products');
  const controller = fileController();

  fileRouter.use('/', func.getSiteID, (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    console.log('IS IT IN FOR EACH ROUTES');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.siteID) {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });

  fileRouter.post('/import', func.checkAuthenticated, controller.importFile);
  // fileRouter.route('/export').post(func.checkAuthenticated, controller.post);

  return fileRouter;
}

module.exports = routes();