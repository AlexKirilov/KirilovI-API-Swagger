import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    // customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}, // For APP v 2
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    productName: { type: String, default: '' },
    productDetails: {
        price: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        imgURL: { type: String, default: '' },
        iconURL: { type: String, default: '' }
    },
    createDate: { type: Date, default: new Date().toISOString() },
    lastEditDate: { type: Date, default: new Date().toISOString() }
});

export default mongoose.model('Products', productsSchema);
