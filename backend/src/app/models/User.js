const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const User = new Schema(
  {
    avatar: { type: String, trim: true },
    fullname: { type: String, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("User", User);
