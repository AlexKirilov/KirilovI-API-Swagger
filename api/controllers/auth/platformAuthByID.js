'use strict';
import Auth from "../../models/Auth.js";

function platformAuthByID() {
  // update lastUpdate property
  async function put(req, res) {
    if (req.body && req.user && req.userId) {
      Auth.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body),
      (err, docs) => {
        if(err) return res.status(500).send(err);
        else return res.status(200);
      });
    } else {
      return res.status(403).send({
        message: 'On issue occurred while user data was updating'
      });
    } 
  }

  async function patch(req, res) { 
    if (req.body && req.user && req.userId) {
      Auth.findByIdAndUpdate(req.userId, Object.assign(req.user, req.body),
      (err, docs) => {
        if(err) return res.status(500).send(err);
        else return res.status(200);
      });
    } else {
      return res.status(403).send({
        message: 'On issue occurred while user data was updating'
      });
    } 
  }

  async function remove(req, res) {
    Auth.findByIdAndRemove(req.params.token, (r) => {
      return res.status(200).send('Deletion complete => ', r);
    },
    (e) => { return console.log(e) } )
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