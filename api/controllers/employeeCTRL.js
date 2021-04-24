
import { convertSort, setLogMSG } from "../func.js";
import Customers from '../models/Customers.js';
import { check, validationResult, body } from "express-validator";

const skipDetails = '-__v -GDPR -siteID -password -company';

function controller() {

  async function get(req, res) {
    // TODO: Version 3 - Update filter and Sort options

    let by = {
      siteID: req.siteID
    };

    const query = req.query;
    const employeeData = req.body;
    const page = parseInt(query.page || employeeData.page) || 1;
    const sort = convertSort(query.sort || employeeData.sortBy || {});
    const perPage = parseInt(query.perPage || employeeData.perPage) || 25;
    const skip = page == 1 ? 0 : (page - 1) * perPage;

    if (!!employeeData.name) {
      by.firstname = { $regex: employeeData.name, $options: "i" };
      by.lastname = { $regex: employeeData.name, $options: "i" };
    }
    if (!!employeeData.email) {
      by.email = { $regex: employeeData.name, $options: "i" };
    }

    const employeeSize = await Customers.countDocuments(by);
    const employeeList = await Customers.find(by, skipDetails)
      .sort(sort)
      .skip(skip)
      .limit(perPage)
      .exec();

    if (!employeeList && !employeeList.length) {
      return res.status(404).send([]);
    }

    return res.status(200).send({
      rows: employeeSize,
      pages: Math.ceil(employeeSize / perPage),
      page: page,
      perPage: perPage,
      displayedRows: employeeList.length,
      firstRowOnPage: page <= 1 ? 1 : (page - 1) * perPage + 1,
      lastRowOnPage: page * perPage - 1 > employeeSize ? employeeSize : page * perPage - 1,
      sortBy: sort,
      results: employeeList
    });
  }

  async function post(req, res) {
    check('email').isEmail().normalizeEmail();
    check('password').isString().trim().isLength({ min: 5 }).escape();
    check('firstname').isString().trim();
    check('siteID').not().isEmpty().isString();
    body('notifyOnReply').toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const data = req.body;

      // Check if the user email exists
      if (!(await Customers.findOne({ email: data.email }).exec())) {
        if (!data.levelAuth || data.levelAuth === "") data.levelAuth = 'EE'

        const newEmployee = {
          email: data.email,
          siteID: req.siteID,
          created: new Date(),
          lastLogin: null,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          fullname: data.firstname + " " + data.lastname,
          company: data.company ? data.company : null,
          levelAuth: data.levelAuth ? data.levelAuth : 'EE',
          type: data.type ? data.type : null,
          GDPR: data.GDPR ? data.GDPR : false,
          personalDiscount: data.personalDiscount ? data.personalDiscount : 0,
          address: {
            town: data.town ? data.town : null,
            phone: data.phone ? data.phone : null,
            address: data.address ? data.address : null,
            address1: data.address1 ? data.address1 : null,
            country: data.country ? data.country : null,
            postcode: data.postcode ? data.postcode : null,
          }
        };

        const result = new Customers(newEmployee)
        result.save().then(result => {
          setLogMSG(req.siteID, result._id, 'information', 'employee', 'post', `Employee with ID: ${result._id} was created successfully`);
          return res.status(200).json({
            message: "Employee was created"
          });
          // TODO: Send confirmation email to the user and the token must exp after a day
        }).catch((err) => {
          setLogMSG(req.siteID, null, 'error', 'employee', 'post', err);
          return res.status(500).send(err);
        });
      } else {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }
    }
  }

  function remove(req, res) {
    let by = {};
    by.siteID = req.siteID;

    const _ids = req.body && req.body.ids ? req.body.ids : null;
    if (_ids && _ids.length) {
      by._id = { $in: _ids }
    }

    Customers.deleteMany(by, (err, result) => {
      if (err) {
        setLogMSG(req.siteID, null, 'error', 'employee', 'delete', err);
        return res.status(500).send(err);
      }

      setLogMSG(req.siteID, null, 'information', 'employee', 'delete', `${result.deletedCount} employee(s) were delete successfully`);
      return res.status(200).json({
        message: `${result.deletedCount} employees were deleted`
      });
    });
  }

  return { get, post, remove }
}

export default controller;