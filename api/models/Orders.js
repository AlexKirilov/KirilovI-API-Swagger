import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  siteID: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  handlerID: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },

  order: { type: Array, default: [] },

  createDate: { type: Date, default: Date().toISOString() },
  orderDate: { type: Date, default: Date().toISOString() },
  canceledDate: { type: Date, default: Date().toISOString() },
  approvedDate: { type: Date, default: Date().toISOString() },
  sendForDeliveryDate: { type: Date, default: Date().toISOString() },
  deliveredDate: { type: Date, default: Date().toISOString() },

  flag: { type: Number, default: 0 },
  // -1 Canceled // 0 For approval // 1 Approved // 2 Delivering // 3 Delivered
  clientNotes: { type: String, default: '' },
  asGift: { type: Boolean, default: false },
  trackingNumber: { type: String, default: '' },
  deliveryCompanyName: { type: String, default: '' }
});

module.exports = mongoose.model("Orders", orderSchema);

/**
 * TODO: Statistic how fast the order is handled
 */