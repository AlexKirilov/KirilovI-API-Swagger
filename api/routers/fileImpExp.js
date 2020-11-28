// File Importer / Exporter router
const func = require('../func');
const express = require('express');
const fileRouter = express.Router();
const Site = require("../models/Site");
const { check, validationResult } = require("express-validator");

const uploadConfig = require('../../config/uploader');
const fileController = require('../controllers/fileImportExport');

function routes() {
  const controller = fileController();

  fileRouter.use('/', uploadConfig, func.checkAuthenticated, async (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.siteID) {
      const editLevel = await Site.findById(req.siteID);
      if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) return next();
      else return res.sendStatus(401);
    } else {
      return res.sendStatus(403);
    }
  });

  fileRouter.post('/import', controller.importFile);
  // fileRouter.route('/export').post(func.checkAuthenticated, controller.post);

  return fileRouter;
}

module.exports = routes();