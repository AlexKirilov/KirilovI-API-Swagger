import { convertSort, checkAuthLevelAsAuth, setLogMSG } from "../func.js";
import * as errorMsg from "../var.js";

import Orders from "../models/Orders.js";

const skipDetails = '-v -createDate -siteID';

function controller() {

  async function get(req, res) {
    let by = {};
    const orderData = req.body;
    const query = req.query;
    const page = parseInt(query.page || orderData.page) || 1;
    const sort = convertSort(query.sort || orderData.sortBy || {});
    const perPage = parseInt(query.perPage || orderData.perPage) || 25;
    const skip = page == 1 ? 0 : (page - 1) * perPage;

    by.siteID = req.siteID;

    if (!!orderData.flag) by.flag = orderData.flag;
    // -1 Canceled // 0 For approval // 1 Approved // 2 Delivering // 3 Delivered
    if (!!orderData.handlerID) by.handlerID = orderData.handlerID;
    if (!!orderData.customerID) by.customerID = orderData.customerID;
    if (!!orderData.trackingNumber) by.trackingNumber = orderData.trackingNumber;

    if (!!orderData.createDate) by.createDate = orderData.createDate;
    if (!!orderData.orderDate) by.orderDate = orderData.orderDate;
    if (!!orderData.canceledDate) by.canceledDate = orderData.canceledDate;
    if (!!orderData.approvedDate) by.approvedDate = orderData.approvedDate;
    if (!!orderData.sendForDeliveryDate) by.sendForDeliveryDate = orderData.sendForDeliveryDate;
    if (!!orderData.deliveredDate) by.deliveredDate = orderData.deliveredDate;

    const orderSize = await Orders.countDocuments(by);

    Orders.find(by, skipDetails)
      .sort(sort)
      .skip(skip)
      .limit(perPage)
      .then((orders) => {
        if (!orders || !orders.length) {
          setLogMSG(req.siteID, null, 'error', 'orders', 'get', err);
          return res.status(404).send();
        }

        return res.status(200).send({
          row: orderSize,
          pages: Math.ceil(orderSize / perPage),
          currentPage: page,
          perPage: perPage,
          displayedRows: orders.length,
          firstRowOnPage: page <= 1 ? 1 : (page - 1) * perPage + 1,
          lastRowOnPage: page * perPage - 1 > orderSize ? orderSize : page * perPage - 1,
          sortBy: sort,
          results: orders
        });
      })
      .catch((err) => {
        setLogMSG(req.siteID, null, 'error', 'orders', 'get', err);
        return res.status(500).send(err);
      });
  }

  async function post(req, res) {

    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      try {
        const data = req.body;
        req.body.siteID = req.siteID;

        let orderData = {};
        orderData.siteID = req.siteID;
        orderData.customerID = req.customerID;

        orderData.order = data.order;
        orderData.asGift = data.asGift;
        orderData.clientNotes = data.clientNotes;

        orderData.address = {
          town: data.town ? data.town : null,
          phone: data.phone ? data.phone : null,
          address: data.address ? data.address : null,
          address1: data.address1 ? data.address1 : null,
          country: data.country ? data.country : null,
          postcode: data.postcode ? data.postcode : null,
        }

        const order = new Orders(orderData);
        order.save((err) => {
          if (err) {
            setLogMSG(req.siteID, null, 'error', 'orders', 'post', err);
            return res.send(err);
          }
          return res.status(200).json(order);
        });
      } catch (err) {
        setLogMSG(req.siteID, null, 'error', 'orders', 'post', err);
        return res.send(err);
      }
    }
  };

  async function remove(req, res) {
    if (checkAuthLevelAsAuth(req.siteID, req.authLevel)) {
      let body = req.body;
      let by = {};
      try {
        // Delete all Orders for specific WebSite
        by.siteID = req.siteID;

        // Delete all Orders by customer
        if (!!body.customerID) {
          by.customerID = body.customerID;
        }

        // Delete all Orders by flag - Status
        if (!!body.flag) {
          by.flag = body.flag;
        }

        const _ids = body && body.ids ? body.ids : null;
        if (_ids && _ids.length) {
          by._id = { $in: _ids }
        }

        Orders.deleteMany(by, (err, result) => {
          if (err) {
            setLogMSG(req.siteID, null, 'error', 'orders', 'delete', err);
            return res.status(500).send(err);
          }
          return res.status(200).json({
            message: `${result.deletedCount} order(s) were deleted`
          });
        });
      } catch (err) {
        setLogMSG(req.siteID, null, 'error', 'orders', 'delete', err);
        return res.status(404).json(errorMsg.notfound);
      }
    } else {
      res.status(401).send(errorMsg.unauthorized);
    }
  }

  return { get, post, remove }
}

export default controller;