import mongoose from 'mongoose'
import { hash as _hash } from 'bcrypt-nodejs';

var customerSchema = new mongoose.Schema({
    siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    company: { type: String, default: '' },
    created: { type: Date, default: new Date().toISOString() },
    lastLogin: { type: Date, default: new Date().toISOString() },
    lastUpdate: { type: Date, default: new Date().toISOString() },
    personalDiscount: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    address: {
        country: { type: String, default: '' },
        town: { type: String, default: '' },
        postcode: { type: String, default: '' },
        address: { type: String, default: '' },
        address1: { type: String, default: '' },
        address2: { type: String, default: '' },
        phone: { type: String, default: '' },
    }
});

customerSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();
    _hash(user.password, null, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

export default mongoose.model('Customers', customerSchema);
