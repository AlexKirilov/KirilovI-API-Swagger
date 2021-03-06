import express from 'express';
import cors from 'cors';
import { connectDB } from "./config/connectToDB.js";
import path from "path";

import fileUpload from "express-fileupload";

import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./api/swagger.js";
import clientDocument from "./api/swagger-client.js";

/******* Routes ****************************/
// Authorisation
import { employeeAuthRoute } from "./api/routers/authEmployee.js";
import { customerAuthRouter } from "./api/routers/authCustomers.js";
import { platformAuthRouter } from "./api/routers/authPlatform.js";
import { verifyAuthRoute } from "./api/routers/verify.js";

// Platform
import { fileRouter } from "./api/routers/fileImpExp.js";
import { employeeRoute } from "./api/routers/employees.js";

// Remaining
import { logsRoute } from "./api/routers/logs.js";
import { siteTypesRoute } from "./api/routers/siteTypes.js";
import { productRoute } from "./api/routers/products.js";
import { ordersRoute } from "./api/routers/orders.js";

// Scheduler
import { runDaily } from "./api/scheduler/dailyChecks.js";

const __dirname = path.resolve();
const app = express();

// ["http://localhost:3000", "http://localhost:4567"​, "https://web-api-be.herokuapp.com"];
// throws an error => SyntaxError: Invalid or unexpected token
const whitelist = [];
whitelist.push("http://localhost:3000");
whitelist.push("http://localhost:4567/");
whitelist.push("https://web-api-be.herokuapp.com");

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(fileUpload());

// Load the DB connection config
connectDB();

const port = process.env.PORT;
const host = process.env.HOST;

app.use('/api/api-docs', serve, (...args) => setup(swaggerDocument)(...args));
app.use('/api/client-docs', serve, (...args) => setup(clientDocument)(...args));

// Authorisation requests
app.use('/api/auth', customerAuthRouter());
// app.use('/employeeAuth', employeeAuthRoute());
app.use('/api/platform/auth', platformAuthRouter());
app.use('/api/platform/siteTypes', siteTypesRoute());
app.use('/api/verify', verifyAuthRoute());

// Platform requests ONLY
app.use('/api/files', fileRouter());
app.use('/api/employees', employeeRoute());

// Client Side requests
app.use('/api/products', productRoute());
app.use('/api/orders', ordersRoute());

app.use('/api/logs', logsRoute());
// app.get('/', (req, res) => res.send('Welcome to my API'));


app.listen(
  port, host,
  () => console.log('Server started: ', port, host)
)
  .on('clientError', (err, socket) => {
    console.error(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'ui/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui/build', 'index.html'));
  });
}

// Scheduler
// For more details visit the link: https://www.npmjs.com/package/node-schedule
runDaily();


/**
 * API V3 TODOs:
 *
 * 1. Split employee and customer tables.
 * 2. Prepare functions witch will switch customers/employees tables .... ?????
 *
 * 3. Income Body Data - Object properties and value validations and Type Check
 *
 * 4. On Account/ Client / Employee creation send temp password and account confirmation email to the user.
 *
 * 5. Research for Products table properties - Add/remove properties - Check the most used on market
 * 6. Prepare Custom pro-form Invoices - Owner can upload personal form and style
 *
 * 7. On order confirmation ot status change send email to the user
 *
 * 8. Investigation for more Statistic charts - Chart hourly sales (as sales counts/ timeline sales as percentages) (Morning, AfterNoon, Evening, Night)
 * 9. Export/Print Chart Results
 * 10. Improve the platform security
 * 11. Boost the performance
 * 12. Clean the code of repeatable elements.
 *
 *
 *
 * API V4 TODOs:
 * 0. Research to improve th platform security even more.
 * 1. ??? Order tracing system
 * 2. Machine learning - Customer preferences and most searched items
 * 3. Client - Employee chat - Help Menu
 * 4. On New WebSite Create new personal DB Tables (Templates) to split the information.
 *
 * 5. Platform (code, usability, db) improving the performance.
 *
 *
 *
 * API V5 TODOs:
 *
 * 0. Platform Security
 * 1. Platform performance
 * 2. DB performance and clean
 */