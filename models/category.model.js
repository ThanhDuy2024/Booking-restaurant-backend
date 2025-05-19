import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  position: Number,
  status: String,
  avatar: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  deletedBy: String,
  updatedBy: String,
  createdBy: String,

},{ timestamps: true }
)

const Category = mongoose.model("Category", schema, "categories");

export default Category;