const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.ObjectId,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
  },
  { collection: "user" }
);

module.exports = UserSchema;
