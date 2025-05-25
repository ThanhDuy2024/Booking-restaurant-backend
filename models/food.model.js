import mongoose from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
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
  slug: {
    type: String,
    slug: "name",
    unique: true
  }
}, {
  timestamps: true,
})

export const Food = mongoose.model("Food", schema, "food");