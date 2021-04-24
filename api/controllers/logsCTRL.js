'use strict';
import Logs from '../models/Logs.js';
import { check, validationResult, body } from "express-validator";
import { convertSort } from "../func.js";

/*
* Logs request will gathering all kind of information,
* and will keeps them for not more than 30 days.
*
*/
const skipDetails = '-__v -_id -siteID -customerID';

function controller() {

  async function get(req, res) {
    // Return all logs for specific Owner Web Site
    // TODO: SYAdmin should see all logs for all Web Sites
    const by = {
      siteID: req.siteID
    };

    const query = req.query;
    const logsFilter = req.body;
    const page = parseInt(query.page || logsFilter.page) || 1;
    const sort = convertSort(query.sort || logsFilter.sortBy || {});
    const perPage = parseInt(query.perPage || logsFilter.perPage) || 25;
    const skip = page == 1 ? 0 : (page - 1) * perPage;

    const isUI = (query.isUI != undefined && query.isUI !== null) ?
      query.isUI :
      (logsFilter.isUI !== undefined && logsFilter.isUI !== null) ?
        logsFilter.isUI : null;

    if (isUI !== null) by.isUI = isUI;
    if (query.level || logsFilter.level)
      by.level = query.level || logsFilter.level || null;
    if (query.logType || logsFilter.logType)
      by.logType = query.logType || logsFilter.logType || null;
    if (query.requestType || logsFilter.requestType)
      by.requestType = query.requestType || logsFilter.requestType || null;

    // filter records between Date
    const after = query.afterDate || logsFilter.afterDate || null;
    const before = query.beforeDate || logsFilter.beforeDate || null;


    if (after && !before) by.createdAt = { $gte: new Date(after) }
    else if (!after && before) by.createdAt = { $lte: new Date(before) }
    else if (after && before) {
      if (new Date(after).valueOf() > new Date(before).valueOf()) {
        return res.status(405).send({ message: 'The end date you entered occurred before the start date' });
      }

      by.createdAt = { $gte: new Date(after), $lte: new Date(before) }
    }

    const logsSize = await Logs.countDocuments(by);
    const logs = await Logs.find(by, skipDetails)
      .sort(sort)
      .skip(skip)
      .limit(perPage)
      .exec();

    if (!logs && !logs.length) {
      return res.status(404).json([]);
    }

    return res.status(200).send({
      rows: logsSize,
      pages: Math.ceil(logsSize / perPage),
      page: page,
      perPage: perPage,
      displayedRows: logs.length,
      firstRowOnPage: page <= 1 ? 1 : (page - 1) * perPage + 1,
      lastRowOnPage: page * perPage - 1 > logsSize ? logsSize : page * perPage - 1,
      sortBy: sort,
      results: logs
    });
  }

  async function post(req, res) {
    check('siteID').not().isEmpty().isString();
    check('level').isString().trim();
    check('logType').isString().trim();
    check('message').isString().trim();
    check('requestType').isString().trim();
    body('notifyOnReply').toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const data = req.body;
      // Record has expiration time of 90 days
      data.isUI = (data.isUI === null || data.isUI === undefined) ? true : data.isUI;
      data.siteID = req.siteID;
      data.customerID = data.customerID || null;

      const log = Logs(req.body);
      log.save().then((err) => {
        if (err) {
          return res.send(err);
        }

        return res.status(200).send();
      });
    }
  }

  async function remove(req, res) {
    // All records will be auto-delete after 90 days of the creation date
    // TODO: Remove all current logs in a specific conditions
  }

  return { get, post, remove }

}

export default controller;