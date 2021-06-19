import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
    // type: { type: mongoose.Schema.Types.ObjectId, ref: 'SiteType'},
    type: { type: Number, required: true},
    name: { type: String, default: '' },
    publicKey: { type: String, default: '' }
});

export default mongoose.model('Site', SiteSchema);