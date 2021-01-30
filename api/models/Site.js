import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteType'},
    name: { type: String, default: '' },
    editProd: { type: String, default: 'MN' },
    editInvoices: { type: String, default: 'MN' },
    publicKey: { type: String, default: '' },
});

export default mongoose.model('Site', SiteSchema);