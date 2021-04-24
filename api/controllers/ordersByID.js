import { checkAuthLevelAsAuth, setLogMSG } from "../func.js";
import * as messages from "../var.js";
import Orders from "../models/Orders.js";

function controller() {

  // function put(req, res) {
  //   if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
  //     const newProd = req.body;
  //     const order = req.order;

  //     const minProperties = [
  //       "productDetails", "categoryID"
  //     ];

  //     const objCheck = checkObjectProperties(req.body, minProperties);
  //     if (objCheck && objCheck.length)
  //       return res.status(409).json({
  //         message: `Following properties '${objCheck.join("', '")}' are missing.`
  //       });

  //     order.productName = newProd.productName || null;
  //     order.productDetails = { ...order, productDetails: newProd.productDetails };
  //     order.categoryID = newProd.categoryID || null;
  //     order.lastEditDate = new Date().toISOString();

  //     Orders.findByIdAndUpdate(req.params.id, order, (err, result) => {
  //       if (err) return res.send(err)
  //       else return res.status(200).send(order)
  //     });
  //   } else {
  //     return res.status(403).send()
  //   }
  // }

  async function patch(req, res) {

    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      const order = req.body;

      if (order.flag === -1 && !req.order.canceledDate)
        req.order.canceledDate = new Date().toISOString();

      if (order.flag === 0 && !req.order.orderDate)
        req.order.orderDate = new Date().toISOString();

      if (order.flag === 1 && !req.order.approvedDate)
        req.order.approvedDate = new Date().toISOString();

      if (order.flag === 2 && !req.order.sendForDeliveryDate)
        req.order.sendForDeliveryDate = new Date().toISOString();

      if (order.flag === 3 && !req.order.deliveredDate)
        req.order.deliveredDate = new Date().toISOString();

      if (!!order.handlerID && req.order.flag !== 0)
        req.order.handlerID = order.handlerID;

      req.order.flag = order.flag;

      req.order.address = {
        town: data.town ? data.town : null,
        phone: data.phone ? data.phone : null,
        address: data.address ? data.address : null,
        address1: data.address1 ? data.address1 : null,
        country: data.country ? data.country : null,
        postcode: data.postcode ? data.postcode : null,
      }

      // TODO: How and when we will update the handlerID => On each update or only on first approving change
      if (!!order.trackingNumber)
        req.order.trackingNumber = order.trackingNumber;

      if (!!order.deliveryCompanyName)
        req.order.deliveryCompanyName = order.deliveryCompanyName;

      req.order.save((err) => {
        if (err) {
          setLogMSG(req.siteID, null, 'error', 'orders', 'patch', err);
          return res.send(err);
        }
        return res.json(req.order)
      });
    }
  }

  async function remove(req, res) {

    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      const by = {
        _id: req.params.id,
        siteID: req.siteID
      };

      Orders.deleteOne(by, (err, result) => {
        if (err) {
          setLogMSG(req.siteID, null, 'error', 'orders', 'remove', err);
          return res.status(500).send(err);
        }
        else return res.status(200).send(messages.remove);
      });

      // if (func.checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      //   Orders.removeById(req.params.id).then(() => {
      //     // logMSG({
      //     //   siteID: req.siteID,
      //     //   customerID: req.userId,
      //     //   level: "information",
      //     //   message: `Product was removed successfully.`,
      //     //   sysOperation: "delete",
      //     //   sysLevel: "order"
      //     // });
      //     res.status(200).send(variables.messages.remove);
      //   });
      // } else {
      //   return res.status(401).send(variables.errorMsg.unauthorized);
      // }
    }
  }

  return { patch, remove } // put, 
}

export default controller;