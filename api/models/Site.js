import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteType'},
    name: { type: String, default: '' },
    publicKey: { type: String, default: '' }
});

export default mongoose.model('Site', SiteSchema);