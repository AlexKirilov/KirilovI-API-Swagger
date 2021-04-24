import mongoose from 'mongoose'

const LogType = 'Product' | 'Customer' | 'Invoices' | null;
const LogLevel = 'Information' | 'Warning' | 'Error' | 'Fatal' | null;
// const requestType = 'GET' | 'POST' | 

const SiteLogsSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers' },
    
    isUI: { type: Boolean, default: null },
    level: { type: String, default: null }, // LogLevel
    logType: { type: String, default: null }, // LogType
    requestType: { type: String, default: null }, // create, get, delete, update, check,

    message: { type: String, default: ' - Missing message - ' },
    createdAt: { type: Date, expires: '90d', default: Date.now }
});

export default mongoose.model('Logs', SiteLogsSchema);