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
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: String,
  updatedBy: String,
}, {
  timeseries: true
})

export const Booking = mongoose.model("Booking", schema, "booking");
