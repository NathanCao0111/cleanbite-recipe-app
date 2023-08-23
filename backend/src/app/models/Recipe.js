const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const TimeSchema = new Schema(
  {
    preparation: { type: String, trim: true, required: true },
    cooking: { type: String, trim: true, required: true },
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
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Recipe", RecipeSchema);
