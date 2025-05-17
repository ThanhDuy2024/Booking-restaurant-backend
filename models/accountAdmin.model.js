import mongoose from 'mongoose';

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
  }, {
    timestamps: true, //updatedAt and createdAt
  }
)

const AccountAdmin = mongoose.model("AccountAdmin", schema, "account-admin");

export default AccountAdmin;