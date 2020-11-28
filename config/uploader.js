const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, __dirname + '/uploads/');
//   },
//   filename: (req, file, cb) => {
//       console.log(file);
//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'xlsx' || file.mimetype == 'csv') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

// const upload = multer({ storage: storage, fileFilter: fileFilter });

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var upload = multer({ //multer settings
              storage: storage, fileFilter: fileFilter
          }).single('file');

module.exports = upload;