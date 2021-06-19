import mongoose from 'mongoose';

const SiteTypesSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    name: { type: String, default: '' }
});

export default mongoose.model('SiteTypes', SiteTypesSchema);