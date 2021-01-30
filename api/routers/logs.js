import func from '../func.js';
import { Router } from 'express';
import { check, validationResult } from "express-validator";
import { get, add, remove } from "../controllers/logsCTRL";

const customersRoute = Router();

routes = () => {

  customersRoute.use("/", func.checkAuthenticated, async (req, res, next) => {
    check("siteID").not().isEmpty().isString();
    check("customerID").not().isEmpty().isString();
    // check("logType").not().isEmpty().isString(); // For next version
    check("level").not().isEmpty().isString();
    check("message").not().isEmpty().isString();
    check("requestType").not().isEmpty().isString();
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

  customersRoute.route('/')
    .get(get)                        // GET All Logs
    .post(add)                      // Add a new log message
    .delete(remove)                // Delete All messages or older than 30 days.

  return customersRoute;
}

export default routes();