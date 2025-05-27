import mongoose from 'mongoose';
import slug from "mongoose-slug-updater";
mongoose.plugin(slug)

const { Schema } = mongoose;

const schema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    phone: String,
    address: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false
    },
    role: String,
    deletedAt: Date,
    deletedBy: String,
    createdBy: String,
    updatedBy: String,
    branch: String, //1
    slug: {
      type: String,
      slug: "fullName",
      unique: true,
    }
  }, {
    timestamps: true, //updatedAt and createdAt
  }
)

const AccountAdmin = mongoose.model("AccountAdmin", schema, "account-admin");

export default AccountAdmin;