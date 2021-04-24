import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  siteID: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  handlerID: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },

  order: { type: Array, default: [] },

  createDate: { type: Date, default: new Date().toISOString() },
  orderDate: { type: Date, default: null },
  canceledDate: { type: Date, default: null },
  approvedDate: { type: Date, default: null },
  sendForDeliveryDate: { type: Date, default: null },
  deliveredDate: { type: Date, default: null },
  expectedDate: { type: Date, default: null },

  flag: { type: Number, default: 0 },
  // -1 Canceled // 0 For approval // 1 Approved // 2 Delivering // 3 Delivered
  clientNotes: { type: String, default: '' },
  asGift: { type: Boolean, default: false },
  trackingNumber: { type: String, default: null },
  deliveryCompanyName: { type: String, default: null },
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

export default mongoose.model('Orders', orderSchema);