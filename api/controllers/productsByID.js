const func = require("../func");
const variables = require("../var");

const Site = require("../models/Site");
const Products = require("../models/Products");

function controller() {
  async function put(req, res) {
    const editLevel = await Site.findById(req.siteID);

    if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) {
      const newProd = req.body;
      const { product } = req.product;
      product.name = newProd.name || null;
      product.pack = newProd.pack || null;
      product.sizes = newProd.sizes || null;
      product.price = newProd.price || null;
      product.imgURL = newProd.imgURL || null;
      product.iconURL = newProd.iconURL || null;
      product.details = newProd.details || null;
      product.discount = newProd.discount || null;
      product.quantity = newProd.quantity || null;
      product.categoryID = newProd.categoryID || null;

      product.save((err) => {
        if (err) return res.send(err);
        return res.json(product)
      });
    } else {
      return res.status(403).send()
    }
  }

  async function patch(req, res) {
    const editLevel = await Site.findById(req.siteID);

    if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) {
      const { product } = req.product

      if (req.product._id) delete req.product._id

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        product[key] = value;
      });

      req.product.save((err) => {
        if (err) return res.send(err);
        return res.json(product)
      });
    }
  }

  async function remove(req, res) {
    const editLevel = await Site.findById(req.siteID);

    if (func.checkAuthLevelAsAuth(editLevel.editProd, req.authLevel)) {
      Products.removeById(req.params.id).then(() => {
        // logMSG({
        //   siteID: req.siteID,
        //   customerID: req.userId,
        //   level: "information",
        //   message: `Product was removed successfully.`,
        //   sysOperation: "delete",
        //   sysLevel: "product"
        // });
        res.status(200).send(variables.successMsg.remove);
      });
    } else {
      return res.status(401).send(variables.errorMsg.unauthorized);
    }
  }

  return { put, patch, remove }
}

module.exports = controller;