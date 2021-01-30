import * as messages from "../var.js";
import Customers from '../models/Customers.js';

function controller() {

  async function put(req, res) {
    const data = req.body;
    try {
      // Check if the user email exists
      if (
        data.email === req.employee.email ||
        await Customers.findOne({ email: data.email }).countDocuments() === 0
      ) {

        const updateEmployee = {
          email: data.email,
          created: new Date(),
          lastLogin: null,
          password: data.password,
          firstname: data.firstname,
          lastname: data.lastname,
          fullname: data.firstname + " " + data.lastname,
          company: data.company ? data.company : null,
          levelAuth: data.levelAuth ? data.levelAuth : 'EE',
          type: data.type ? data.type : null,
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
        Customers.findByIdAndUpdate(req.params.id, updateEmployee, (err, result) => {
          if (err) return res.send(err)
          else return res.status(200).send(updateEmployee)
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
    const data = req.body;
    // Check if the user email exists
    if (
      data.email === req.employee.email ||
      await Customers.findOne({ email: data.email }).countDocuments() === 0
    ) {
      const employee = req.employee;

      if (data._id) delete data._id;
      if (data.siteID) delete data.siteID;
      if (req.employee._id) delete req.employee._id;
      if (req.employee.siteID) delete req.employee.siteID;

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        employee[key] = value;
      });

      req.employee.save((err) => {
        if (err) return res.send(err);
        return res.json(employee)
      });
    } else {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }
  }

  function remove(req, res) {
    const by = {
      _id: req.params.id,
      siteID: req.siteID
    };

    Customers.deleteOne(by, (err, result) => {
      if (err) return res.status(500).send(err);
      else return  res.status(200).send({ message:messages.remove });
    });
  }

  return { put, patch, remove }
}

export default controller;