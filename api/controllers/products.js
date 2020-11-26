const func = require("../func");
const variables = require("../var");

const Site = require("../models/Site");
const Products = require("../models/Products");
const Customers = require("../models/Customers");

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
    let customerDiscount = 0;
    let by = {};
    const productData = req.body;
    const query = req.query;
    const page = parseInt(query.page || productData.page) || 1;
    const sort = convertSort(query.sort || productData.sortBy || {});
    const perPage = parseInt(query.perPage || productData.perPage) || 25;
    const skip = page == 1 ? 0 : (page - 1) * perPage;

    by.siteID = req.siteID;

    if (!!productData.name) by.name = { $regex: productData.name, $options: "i" };
    // if (!!productData.price) by.price = productData.price; // TODO: Search between min and max price
    // if (!!productData.quantity) by.quantity = productData.quantity;
    if (!!productData.categoryID) by.categoryID = productData.categoryID;
    if (!!req.userId) {
      const customer = await Customers.findById(req.userId);
      customerDiscount = (customer) ? customer.personalDiscount : 0;
    }

    const productSize = await Products.countDocuments(by);
    const products = await Products.find(by).sort(sort).skip(skip).limit(20).exec();

    if (!products && !products.length) {
      return res.status(404).send();
    }

    products.forEach(item => item.discount = customerDiscount);

    return res.status(200).send({
      rows: productSize,
      pages: Math.ceil(productSize / perPage),
      page: page,
      perPage: perPage,
      displayedRows: products.length,
      firstrowOnPage: page <= 1 ? 1 : (page - 1) * perPage + 1,
      lastRowOnPage: page * perPage - 1 > productSize ? productSize : page * perPage - 1,
      sortBy: sort,
      results: products
    });
  }

  async function post(req, res) {
    const editLevel = await Site.findById(req.siteID);

    if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) {
      try {
        const product = new Products(req.body);
        product.save((err) => {
          if (err) return res.send(err);
          return res.status(200).json(product);
        });
      } catch (err) {
        return res.send(err);
      }
    }
  };

  async function remove(req, res) {
    const editLevel = await Site.findById(req.siteID);

    if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) {
      let data = req.body;
      let by = {};
      try {
        // Delete all Products for specific WebSite
        by.siteID = req.siteID;
        // Delete all Products by Category
        if (!!data.categoryID) {
          by.categoryID = data.categoryID;
        }

        Products.deleteMany(by).exec().then(() => {
          // logMSG({
          //   siteID: req.siteID,
          //   customerID: req.userId,
          //   level: "information",
          //   message: `Product was removed successfully.`,
          //   sysOperation: "delete",
          //   sysLevel: "product"
          // });
          return res.status(200).send(variables.successMsg.remove);
        });
      } catch (err) {
        return res.status(404).json(variables.errorMsg.notfound);
      }
    } else {
      res.status(401).send(variables.errorMsg.unauthorized);
    }
  }

  return { get, post, remove }
}

module.exports = controller;