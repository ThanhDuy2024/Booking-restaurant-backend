import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  categoryId: String,
  position: Number,
  status: String,
  avatar: String,
  price: Number,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: String,
  updatedBy: String,
  createdBy: String,
}, {
  timestamps: true,
})

export const Food = mongoose.model("Food", schema, "food");