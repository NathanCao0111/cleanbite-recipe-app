const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    avatar: { type: String, trim: true },
    fullname: { type: String, trim: true, minLength: 2, maxLength: 70 },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: (value) =>
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
        message:
          "Password requires a number, a lowercase letter, an uppercase letter, a symbol & 8 characters minimum",
      },
    },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("User", UserSchema);
