import express from 'express';
import cors from 'cors';
import { connectDB } from "./config/connectToDB.js";

import fileUpload from "express-fileupload";

import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./api/swagger.js";
import clientDocument from "./api/swagger-client.js";

/******* Routes ****************************/
// Authorisation
import { employeeAuthRoute } from "./api/routers/authEmployee.js";
import { customerAuthRoute } from "./api/routers/authCustomers.js";
import { platformAuthRouter } from "./api/routers/authPlatform.js";
import { verifyAuthRoute } from "./api/routers/verify.js";

// Platform
import { fileRouter } from "./api/routers/fileImpExp.js";
import { employeeRoute } from "./api/routers/employees.js";

// Remaining
import { productRoute } from "./api/routers/products.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Load the DB connection config
connectDB();

const port = process.env.PORT;
const host = process.env.HOST;

app.use('/api-docs', serve, (...args) => setup(swaggerDocument)(...args));
app.use('/client-docs', serve, (...args) => setup(clientDocument)(...args));

// Authorisation requests
// app.use('/auth', customerAuthRoute());
// app.use('/employeeAuth', employeeAuthRoute());
app.use('/platform/auth', platformAuthRouter());
app.use('/verify', verifyAuthRoute());

// Platform requests ONLY
app.use('/files', fileRouter());
app.use('/employees', employeeRoute());

// Client Side requests
app.use('/products', productRoute());


// app.get('/', (req, res) => res.send('Welcome to my API'));

app.listen(
  port, host,
  () => console.log('Server started: ', port, host)
)
  .on('clientError', (err, socket) => {
    console.error(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });



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
 * 11. Boost the preformance
 * 12. Clean the code of repeatable elements.
 *
 *
 *
 * API V4 TODOs:
 * 0. Reserch to improve th platform security even more.
 * 1. ??? Order traking system
 * 2. Machine learning - Customer preferences and most searched items
 * 3. Client - Employee chat - Help Menu
 * 4. On New WebSite Create new personal DB Tables (Templates) to split the information.
 *
 * 5. Platform (code, usbaility, db) imroving the preformance.
 *
 *
 *
 * API V5 TODOs:
 *
 * 0. Platform Security
 * 1. Platform preformance
 * 2. DB preformance and clean
 */