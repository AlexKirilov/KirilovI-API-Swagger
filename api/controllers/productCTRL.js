import { convertSort, checkAuthLevelAsAuth } from "../func.js";
import * as errorMsg from "../var.js";

import Products from "../models/Products.js";
import Customers from "../models/Customers.js";

const skipDetails = '-v -createDate -siteID';

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

    Products.find(by, skipDetails)
      .sort(sort)
      .skip(skip)
      .limit(20)
      .then((products) => {
        if (!products && !products.length) {
          return res.status(404).send();
        }

        // add customer discount to each product
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
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }

  async function post(req, res) {
    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      try {
        req.body.siteID = req.siteID;
        const product = new Products(req.body, skipDetails);
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
    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      let body = req.body;
      let by = {};
      try {
        // Delete all Products for specific WebSite
        by.siteID = req.siteID;
        // Delete all Products by Category
        if (!!body.categoryID) {
          by.categoryID = body.categoryID;
        }
        const _ids = body && body.ids ? body.ids : null;
        if (_ids && _ids.length) {
          by._id = { $in: _ids }
        }

        Products.deleteMany(by, (err, result) => {
          if (err) return res.status(500).send(err);
          return res.status(200).json({
            message: `${result.deletedCount} product(s) were deleted`
          });
        });
      } catch (err) {
        return res.status(404).json(errorMsg.notfound);
      }
    } else {
      res.status(401).send(errorMsg.unauthorized);
    }
  }

  return { get, post, remove }
}

export default controller;