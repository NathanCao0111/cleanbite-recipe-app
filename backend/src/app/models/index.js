const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const TimeSchema = new Schema(
  {
    preparation: { type: String, required: true },
    cooking: { type: String, required: true },
  },
  { _id: false }
);

// const RatingSchema = new Schema(
//   {
//     stars: Number,
//     ratings: Number,
//   },
//   { _id: false }
// );

const RecipeSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    cuisine: { type: String, trim: true },
    ingredients: { type: Array, required: true },
    method: { type: Array, required: true },
    time: TimeSchema,
    serves: { type: Number, required: true },
    // rating: RatingSchema,
    image: { type: String, trim: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    avatar: { type: String, trim: true },
    fullname: { type: String, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { User, Recipe };
