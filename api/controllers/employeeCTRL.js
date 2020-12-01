
const func = require("../func");
const Customers = require('../models/Customers');

function convertSort(sortColumn) {
  if (typeof sortColumn !== "object") {
    let sort = {};
    sortColumn.split(",").forEach(element => {
      let tmpEl = element.toString().toLowerCase();
      if (tmpEl.indexOf("desc") !== -1) {
        sortColumn.indexOf("desc") !== -1
          ? (sortColumn = sortColumn.split("desc"))
          : (sortColumn = sortColumn.split("Desc"));
        sortColumn.pop();
        sort[sortColumn.toString()] = "desc";
      } else {
        sort[sortColumn] = "asc";
      }
      sortColumn = sort;
    });
  } else {
  }
  return sortColumn;
}

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
    const employeeList = await Customers
      .find(by, '-__v -GDPR -siteID -password -company')
      .sort(sort)
      .skip(skip)
      .limit(20)
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
      firstrowOnPage: page <= 1 ? 1 : (page - 1) * perPage + 1,
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
    sanitizeBody('notifyOnReply').toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const data = req.body;

      // Check if the user email exists
      if (!(await Customers.findOne({ email: data.email }).exec())) {
        if (!data.levelAuth || data.levelAuth === "") data.levelAuth = 'EE'

        try {
          const newCustomer = {
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

          const newEmployee = new Customers(newCustomer)
          newEmployee.save().then(result => {
            // logMSG({
            //   siteID: req.siteID,
            //   customerID: result._id,
            //   level: 'information',
            //   message: `New Customer was created with ID '${result._id}' for web site ID '${req.siteID}'`,
            //   sysOperation: 'create',
            //   sysLevel: 'customer'
            // });
            return func.createToken(res, result, siteData);
          }).catch((err) => {
            // logMSG({
            //   siteID: req.siteID,
            //   customerID: result._id,
            //   level: 'error',
            //   message: `New Customer was created with ID '${result._id}' for web site ID '${req.siteID}'`,
            //   sysOperation: 'create',
            //   sysLevel: 'customer'
            // });
            return res.status(500).send(err);
          });

        } catch (error) {
          return res.status(500).send(error);
        }
      } else {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }
    }
  }

  async function remove(req, res) {
    const by = {
      siteID: req.siteID
    };

    const result = await Customers.deleteMany(by).exec();
    result.then((deletion) => {
      console.log('DELETE ALL => ', deletion);

      //   logMSG({ // Add new Log
      //     siteID: req.siteID,
      //     customerID: req.userId,
      //     level: 'information',
      //     message: `Customer with ID '${req.userId}' was successfully removed from web site with ID '${req.siteID}'.`,
      //     sysOperation: 'delete',
      //     sysLevel: 'customer'
      // });
      res.status(200).send(variables.successMsg.remove);

    }).catch((err) => {
      //   logMSG({ // Add new Log
      //     siteID: req.siteID,
      //     customerID: req.userId,
      //     level: 'error',
      //     message: func.onCatchCreateLogMSG(err),
      //     sysOperation: 'delete',
      //     sysLevel: 'customer'
      // });
      return res.status(500).send(err);
    });
  }

  return { get, post, remove }
}

module.exports = controller;