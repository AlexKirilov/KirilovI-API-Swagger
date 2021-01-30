
'use strict';
import Auth from '../../models/Auth.js';

function authAuthByID() {

  async function verify(req, res) {
    try {
      const auth = await Auth.findOne({ _id: req._id });
      if (auth.active) {
        return res.status(200).send({ message: 'Account is already active' });
      }
      auth.active = true;
      await auth.save();
      return res.status(200).send({ message: 'Email was confirmed and user is now active' });
    } catch (err) {
      if (err) return res.send(err);
    }
  }

  return { verify };
}

export default authAuthByID;