import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
mongoose.plugin(slug)

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
  slug: {
      type: String,
      slug: "name",
      unique: true
    }
},{ timestamps: true }
)

const Category = mongoose.model("Category", schema, "categories");

export default Category;