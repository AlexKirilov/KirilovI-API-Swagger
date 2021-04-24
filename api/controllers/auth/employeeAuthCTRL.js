import Site from '../../models/Site.js';
import Auth from '../../models/Auth.js';
import { createToken, setLogMSG } from '../../func.js';

/*
* Auth includes only the Platform CRUD request.
* Auth doesn't have connection to the client CRUD.
* In next version each Owner will have separated domain and login form.
* All employees will be allowed to login into the platform from that form ONLY.
*/
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

            Site.findById(req.siteID)
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

                      createToken(res, auth, resultData);
                    }
                  });
                }
              })
              .catch(err => {
                setLogMSG(req.siteID, null, 'error', 'employee', 'post', err);
                res.status(500).json({ error: err });
              });
          }
        }).catch(err => {
          setLogMSG(req.siteID, null, 'error', 'employee', 'post', err);
          res.status(500).json({ error: err });
        });
    }
  }


  return { login };
}

export default controller;