import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site'},
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customers'},
    productID : { type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
    comment: { type: String, default: '' },
    clientName: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    created: { type: Date, default: new Date().toISOString() }
});

module.exports = mongoose.model('Comments', commentsSchema);