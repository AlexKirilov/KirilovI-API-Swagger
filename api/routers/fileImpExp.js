// File Importer / Exporter router
import { Router } from 'express';
import Site from "../models/Site.js";
import { check, validationResult } from "express-validator";
import { validateToken, checkAuthLevelAsAuth } from "../func.js";
import { importFile } from '../controllers/fileImportExport.js';

const router = Router();
// TODO List
/**
 * Variable to distinguish the main UI platform and the Client Websites
 */

export function fileRouter() {

  router.use('/', validateToken, async (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("notifyOnReply").toBoolean();
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else if (req.siteID) {
      const editLevel = Site.findById(req.siteID);
      if (checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) return next();
      else return res.sendStatus(401);
    } else {
      return res.sendStatus(403);
    }
  });

  router.post('/import', importFile);
  // fileRouter.route('/export').post(func.checkAuthenticated, controller.post);

  return router;
}