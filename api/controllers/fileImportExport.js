'use strict';
const excelToJson = require('convert-excel-to-json');
// var xlsx = require('node-xlsx');
// const fs = require('fs');
const { ObjectId } = require('mongodb');
const Products = require("../models/Products");

function checkImportForRequiredColumns(jsonObj) {
  let isAllFields = true;
  const jsonHeaders = Object.keys(jsonObj);
  const minRequiredFields = ['name', 'price', 'quantity'];

  minRequiredFields.forEach(property => {
    if (!jsonHeaders.includes(property)) {
      isAllFields = false;
      return;
    }
  });

  return isAllFields;
}

function fileController() {


  async function importFile(req, res) {
    // console.log('importFile => ', req);
    // var obj = xlsx.parse(__dirname + 'API-Test.xlsx'); // parses a file
    // var obj1 = xlsx.parse(fs.readFileSync(__dirname + '/API-Test.xlsx')); // parses a buffer

    const result = excelToJson({
      sourceFile: __dirname + '/API-Test.xlsx',
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
              newRecord[key] = ObjectId(newRecord[key]) :
              newRecord[key] = ObjectId(null);
          }

          // Set siteID REQUIRED
          newRecord.siteID = req.siteID;

        });

        return newRecord;
      });

      Products.insertMany(firstSheet)
        .then(() => res.sendStatus(200))
        .catch((err) => res.send(err))

    } else {
      return res.status(403).json({
        message: `Imported File NOT cover the minimum required columns of ${minRequiredFields}`
      })
    }
  }

  return { importFile }
}

module.exports = fileController;