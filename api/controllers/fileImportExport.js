'use strict';
import excelToJson from 'convert-excel-to-json';
import Products from "../models/Products.js";
import mongodb from 'mongodb'

const minRequiredFields = ['name', 'price', 'quantity'];

function checkImportForRequiredColumns(jsonObj) {
  let isAllFields = true;
  const jsonHeaders = Object.keys(jsonObj);

  minRequiredFields.forEach(property => {
    if (!jsonHeaders.includes(property)) {
      isAllFields = false;
      return;
    }
  });

  return isAllFields;
}

export async function importFile(req, res) {
  if (req.files.file) {
    const nameExt = req.files.file.name.split('.')
    console.log('EXTENSION => ', req.files.file.mimetype);
    
    if (req.files.file.mimetype !== 'text/xlsx' && req.files.file.mimetype !== 'xlsx' && nameExt[nameExt.length - 1] !== 'xlsx') {
      return res.status(403).json({
        message: `Provided file format "${req.files.file.mimetype}" is not matching the acceptable criteria. Provide file with an excel xlsx extension only.`
      })
    }

    const result = excelToJson({
      source: req.files.file.data,
      columnToKey: {
        '*': '{{columnHeader}}'
      },
      header: {
        rows: 1
      }
    });

    const firstSheet = result[Object.keys(result)[0]];

    if (checkImportForRequiredColumns(firstSheet[0])) {

      firstSheet.forEach(newRecord => {
        Object.keys(newRecord).forEach((key) => {

          // Strings includes comma convert to array
          if (newRecord[key] !== '' && newRecord[key] !== key && (key === 'sort' || (key === 'sizes' && isNaN(newRecord[key])))) {
            newRecord[key] = newRecord[key].split(',');
          }

          // Set Category ID
          if (newRecord[key] !== key && key === 'categoryID') {
            newRecord[key] !== '' ?
              newRecord[key] = mongodb.ObjectId(newRecord[key]) :
              newRecord[key] = mongodb.ObjectId(null);
          }

          // Set siteID REQUIRED
          newRecord.siteID = req.siteID;
          newRecord.createDate = new Date();
          newRecord.lastEditDate = new Date();
        });

        return newRecord;
      });

      Products.insertMany(firstSheet)
        .then(() => res.status(200).json({
          message: `File "${req.files.file.name}" was readed and ${firstSheet.length} items were added to the Products Database.`
        }))
        .catch((err) => res.send(err));

    } else {
      return res.status(403).json({
        message: `Imported File NOT cover the minimum required columns of ${minRequiredFields}`
      })
    }
  } else {
    return res.status(500).json({
      message: `There was an issue buffering the file`
    })
  }
}
