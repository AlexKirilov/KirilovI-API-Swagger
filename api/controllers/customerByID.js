import * as messages from "../var.js";
import Customers from '../models/Customers.js';

function controller() {

  async function put(req, res) {
    // Only Customer can update
    // Only >= MN can update
    
    const data = req.body;
    try {
      // Check if the user email exists
      if (
        data.email === req.customer.email ||
        await Customers.findOne({ email: data.email }).countDocuments() === 0
      ) {

        const updateCustomer = {
          email: data.email,
          created: new Date(),
          lastLogin: null,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          fullname: data.firstname + " " + data.lastname,
          company: data.company ? data.company : null,
          type: data.type ? data.type : null,
          address: {
            town: data.town ? data.town : null,
            phone: data.phone ? data.phone : null,
            address: data.address ? data.address : null,
            address1: data.address1 ? data.address1 : null,
            country: data.country ? data.country : null,
            postcode: data.postcode ? data.postcode : null,
          }
        };

        // TODO: If Manager
        updateCustomer.siteID = req.siteID;
        updateCustomer.levelAuth = data.levelAuth || "CU";
        updateCustomer.personalDiscount = data.personalDiscount;

        Customers.findByIdAndUpdate(req.params.id, updateCustomer, (err, result) => {
          if (err) return res.send(err)
          else return res.status(200).send(updateCustomer)
        });
      } else {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async function patch(req, res) {
    // Only Customer can patch
    // Only >= MN can patch
    const data = req.body;
    // Check if the user email exists
    if (
      data.email === req.customer.email ||
      await Customers.findOne({ email: data.email }).countDocuments() === 0
    ) {
      const customer = req.customer;

      // TODO If NOT Manager
      if (data._id) delete data._id;
      if (data.GDPR) delete data.GDPR;
      if (data.siteID) delete data.siteID;
      if (data.levelAuth) delete data.levelAuth; //
      if (req.customer._id) delete req.customer._id;
      if (req.customer.GDPR) delete req.customer.GDPR;
      if (req.customer.siteID) delete req.customer.siteID;
      if (req.customer.levelAuth) delete req.customer.levelAuth; // 

      // If Not Manager
      if (data.levelAuth) delete data.levelAuth; // 
      if (data.personalDiscount) delete data.personalDiscount;
      if (req.customer.levelAuth) delete req.customer.levelAuth; //
      if (req.customer.personalDiscount) delete req.customer.personalDiscount;

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        customer[key] = value;
      });

      req.customer.save((err) => {
        if (err) return res.send(err);
        return res.json(customer)
      });
    } else {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }
  }

  function remove(req, res) {
    // Only Customer can delete
    // Only >= MN can delete
    const by = {
      _id: req.params.id,
      siteID: req.siteID,
      levelAuth: 'CU'
    };

    Customers.deleteOne(by, (err, result) => {
      if (err) return res.status(500).send(err);
      else return res.status(200).send(messages.remove);
    });
  }

  return { put, patch, remove }
}

export default controller;