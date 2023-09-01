const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
  {
    avatar: { type: String, trim: true },
    fullname: {
      type: String,
      minLength: 2,
      maxLength: 70,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      minLength: 6,
      maxLength: 20,
      trim: true,
      required: true,
      unique: true,
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
      minLength: 8,
      maxLength: 70,
      required: true,
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
