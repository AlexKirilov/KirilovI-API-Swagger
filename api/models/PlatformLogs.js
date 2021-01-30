import mongoose from 'mongoose';

const LogType = 'Product' | 'Customer' | 'Invoices' | null;
const LogLevel = 'Information' | 'Warning' | 'Error' | 'Fatal' | null;
// const requestType = 'GET' | 'POST' | 

var PlatformLogsSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site'},
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers'},
    logType: { type: String, default: null }, // LogType
    level: { type: String, default: null }, // LogLevel
    message: { type: String, default: ' - Missing message - ' },
    requestType: { type: String, default: null }, // create, get, delete, update, check,
    sysLevel: { type: String, default: null }, // - , auth, site, invoiceDetails, contactsDetails
    logDateTime: { type: Date, default: new Date ().toISOString() },
});

export default mongoose.model('PlatformLogs', PlatformLogsSchema);