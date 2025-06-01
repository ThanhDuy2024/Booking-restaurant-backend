import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const { Schema } = mongoose;

const schema = new Schema({
  branchId: String,
  fullName: String,
  phone: String,
  email: String,
  totalPerson: Number,
  timeAll: Date,
  note: String,
  status: String,
  deleted: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    slug: "fullName",
    unique: true,
  },
  deletedAt: Date,
  deletedBy: String,
  updatedBy: String,
}, {
  timestamps: true
})

export const Booking = mongoose.model("Booking", schema, "booking");
