'use strict';
import Site from '../../models/Site.js';
import Auth from '../../models/Auth.js';
import { onCatchCreateLogMSG, createToken } from '../../func.js';

function controller() {

  async function login(req, res) {
    check('email').isString().isEmail().normalizeEmail();
    check('password').isString().trim().isLength({ min: 5 }).escape();
    body('notifyOnReply').toBoolean();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      Auth.findOne({ email: loginData.email }) //, '-__v -firstname -lastname');
        .select('lastLogin siteID password levelAuth _id')
        .exec()
        .then(owner => {
          if (!owner) {
            res.status(404).send(variables.errorMsg.notfound);
          } else {

            Site.findById(auth.siteID)
              .exec()
              .then(resultData => {
                if (!resultData) {
                  res.status(404).json({ message: 'No valid entry found for provided Email' });
                } else {
                  bcrypt.compare(loginData.password, auth.password, (err, isMatch) => {
                    if (!isMatch) {
                      return res.status(401).send(variables.errorMsg.unauthorized);
                    } else {

                      // Updating the last user login datetime
                      owner.lastLogin = new Date();
                      owner.update(owner, (err, newUser) => {
                        if (err) return res.status(500).send(variables.errorMsg.update);
                      });

                      logMSG({
                        level: 'information',
                        message: `User with ID '${auth.id}' logged in successfully`,
                        sysOperation: 'login',
                        sysLevel: 'auth'
                      });

                      createToken(res, auth, resultData);
                    }
                  });
                }
              })
              .catch(err => {
                logMSG({
                  level: 'error',
                  message: onCatchCreateLogMSG(err),
                  sysOperation: 'check',
                  sysLevel: 'auth'
                });
                res.status(500).json({ error: err });
              });
          }
        }).catch(err => {
          logMSG({
            level: 'error',
            message: onCatchCreateLogMSG(err),
            sysOperation: 'check',
            sysLevel: 'auth'
          });
          res.status(500).json({ error: err });
        });
    }
  }


  return { login };
}

export default controller;