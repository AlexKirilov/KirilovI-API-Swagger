'use strict';
import Customers from "../../models/Customers.js";

function customerAuthByID() {
  // TODO: update lastLogin property

  async function put(req, res) {
    if (req.body && req.user && req.userId) {
      Customers.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body),
        (err, docs) => {
          if (err) {
            setLogMSG(req.siteID, null, 'error', 'customer', 'post', err);
            return res.status(500).send(err);
          } else return res.status(200);
        });
    } else {
      return res.status(403).send({
        message: 'Issue occurred while user data was updating'
      });
    }
  }

  async function patch(req, res) {
    if (req.body && req.user && req.userId) {
      Customers.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body),
        (err, docs) => {
          if (err) return res.status(500).send(err);
          else return res.status(200);
        });
    } else {
      return res.status(403).send({
        message: 'Issue occurred while user data was updating'
      });
    }
  }

  async function remove(req, res) {
    Customers.findByIdAndRemove(req.params.token, (r) => {
      return res.status(200).send('Deletion complete => ', r);
    },
      (e) => { return console.log(e) })

  }

  return { put, patch, remove }
}

export default customerAuthByID;