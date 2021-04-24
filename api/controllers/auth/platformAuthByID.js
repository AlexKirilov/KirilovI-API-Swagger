'use strict';
import Auth from "../../models/Auth.js";
import { setLogMSG } from "../../func.js";

/**
 * That Controller will be used ONLY for the Platform purposes
 * The control details will not be include into the clientSwagger
 */
function platformAuthByID() {

  async function put(req, res) {
    // TODO: Check for all necessary properties before update

    if (req.body && req.user && req.userId) {
      Auth.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body, { lastUpdate: new Date() }),
        (err, docs) => {
          if (err) {
            setLogMSG(req.siteID, req.userId, 'error', 'auth', 'patch', err);
            return res.status(500).send(err);
          } else {
            setLogMSG(req.siteID, req.userId, 'information', 'auth', 'patch', `User with ID: ${req.userId} was updated`);
            return res.status(200);
          }
        });
    } else {
      return res.status(403).send({
        message: 'Issue occurred while user data was updating'
      });
    }
  }

  async function patch(req, res) {
    if (req.body && req.user && req.userId) {
      Auth.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body, { lastUpdate: new Date() }),
        (err, docs) => {
          if (err) {
            setLogMSG(req.siteID, req.userId, 'error', 'auth', 'patch', err);
            return res.status(500).send(err);
          } else {
            setLogMSG(req.siteID, req.userId, 'information', 'auth', 'patch', `User with ID: ${req.userId} was updated`);
            return res.status(200);
          }
        });
    } else {
      return res.status(403).send({
        message: 'Issue occurred while user data was updating'
      });
    }
  }

  async function remove(req, res) {
    Auth.findByIdAndRemove(req.params.token, (r) => {
      return res.status(200).send('Deletion complete => ', r);
    },
      (e) => { return console.log(e) })
    // TODO: deletion at the end, when all tables are know well
    // validate selected checkboxes before delete
    // delete all data ???
    // delete all products
    // delete all logs
    // delete all employees
    // etc....
  }

  return { put, patch, remove }
}
export default platformAuthByID;