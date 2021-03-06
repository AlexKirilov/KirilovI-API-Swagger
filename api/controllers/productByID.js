import { checkAuthLevelAsAuth, checkObjectProperties, setLogMSG } from "../func.js";
import * as messages from "../var.js";
import Products from "../models/Products.js";

function controller() {

  function put(req, res) {
    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      const newProd = req.body;
      const product = req.product;

      const minProperties = [
        "productDetails", "categoryID"
      ];

      const objCheck = checkObjectProperties(req.body, minProperties);
      if (objCheck && objCheck.length)
        return res.status(409).json({
          message: `Following properties '${objCheck.join("', '")}' are missing.`
        });

      product.productName = newProd.productName || null;
      product.productDetails = { ...product, productDetails: newProd.productDetails };
      product.categoryID = newProd.categoryID || null;
      product.lastEditDate = new Date().toISOString();

      Products.findByIdAndUpdate(req.params.id, product, (err, result) => {
        if (err) {
          setLogMSG(req.siteID, null, 'error', 'products', 'put', err);
          return res.send(err);
        }
        else return res.status(200).send(product)
      });
    } else {
      setLogMSG(req.siteID, null, 'error', 'products', 'put', err);
      return res.status(403).send()
    }
  }

  async function patch(req, res) {

    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      const product = req.product

      if (req.product._id) delete req.product._id

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        product[key] = value;
      });

      req.product.save((err) => {
        if (err) {
          setLogMSG(req.siteID, null, 'error', 'products', 'patch', err);
          return res.send(err);
        }
        return res.json(product)
      });
    }
  }

  async function remove(req, res) {

    const by = {
      _id: req.params.id,
      siteID: req.siteID
    };

    Products.deleteOne(by, (err, result) => {
      if (err) {
        setLogMSG(req.siteID, null, 'error', 'products', 'delete', err);
        return res.status(500).send(err);
      }
      else return res.status(200).send(messages.remove);
    });
  }

  return { put, patch, remove }
}

export default controller;