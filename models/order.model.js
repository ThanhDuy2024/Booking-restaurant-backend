import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  branchId: String,
  foodsId: Array,
  totalPrice: Number,
  discount: Number,
  tableNumber: Number,
  status: String,
  deleted: Boolean,
  deletedAt: Date,
  deletedBy: String,
  createdBy: String,
  updatedBy: String,
}, {
  timestamps: true
})

const Order = mongoose.model("Order", schema, "orders");

export default Order;