const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/connectToDB');
var fileupload = require("express-fileupload");

app.use(cors());
app.use(fileupload());
app.use(bodyParser.json());

// Load the DB connection config
connectDB();

const routes = "./api/routers";

// Swagger Documentation Build
// const swaggerUI = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerSpec = swaggerJSDoc({
//   swaggerDefinition: {
//     basePath: '/api/',
//     info: {
//       title: 'Kirilovi API',
//       version: '0.0.1'
//     }
//   },
//   apis: [
//     `${routes}/products`
//   ],
// });

const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./api/swagger.json");

const port = process.env.PORT;
const host = process.env.HOST;

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/files', require(`${routes}/fileImpExp`));
app.use('/products', require(`${routes}/products`));
app.get('/', (req, res) => res.send('Welcome to my API'));

app.listen(
  port, host,
  () => console.log('Server started: ', port, host)
)
  .on('clientError', (err, socket) => {
    console.error(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });