import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
const { Schema } = mongoose;
mongoose.plugin(slug);

const schema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
  avatar: String,
  status: String,
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedBy: String,
  deletedAt: Date,
  updatedBy: String,
  createdBy: String,
}, {
  timestamps: true
})

export const Branch = mongoose.model("Branch", schema, "branchs");