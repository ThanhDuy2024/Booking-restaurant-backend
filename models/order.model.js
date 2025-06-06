import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  branchId: String,
  foods: Array,
  totalOrigin: Number,
  totalPrice: Number,
  discount: String,
  tableNumber: Number,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: String,
  createdBy: String,
  updatedBy: String,
}, {
  timestamps: true
})

const Order = mongoose.model("Order", schema, "orders");

export default Order;