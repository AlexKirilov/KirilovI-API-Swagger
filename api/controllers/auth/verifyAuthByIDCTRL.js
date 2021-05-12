
'use strict';
import Auth from '../../models/Auth.js';
import Site from '../../models/Site.js';
import { setLogMSG, checkForExistingEmail } from "../../func.js";

function authAuthByID() {

  async function verify(req, res) {
    try {
      const auth = await Auth.findOne({ _id: req._id });
      if (auth.active) {
        return res.status(200).send({ message: 'Account is already active' });
      }

      auth.active = true;
      await auth.save();
      setLogMSG(req.siteID, req._id, 'information', 'verify', 'post', `User with ID: ${req._id} was approved and the account is now active`);
      return res.status(200).send({ message: 'Email was confirmed and user is now active' });

    } catch (err) {
      setLogMSG(req.siteID, null, 'error', 'verify', 'post', err);
      return res.send(err);
    }
  }

  async function email(req, res) {
    const bool = await checkForExistingEmail(req.email);
    return res.status(200).send(bool);
  }

  async function websiteName(req, res) {
    console.log('Check for Name', req.name);
    const isExist = await Site.findOne({ name: req.name });
    return res.status(200).send(isExist ? true : false);
  }

  return { verify, email, websiteName };
}

export default authAuthByID;