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

const RatingSchema = new Schema(
  {
    stars: Number,
    ratings: Number,
  },
  { _id: false }
);

const Recipe = new Schema(
  {
    title: { type: String, required: true },
    cuisine: String,
    ingredients: { type: Array, required: true },
    method: { type: Array, required: true },
    time: TimeSchema,
    serves: { type: Number, required: true },
    rating: RatingSchema,
    image: { type: String, required: true },
  },
  { timestamps: true }
);

Recipe.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Recipe", Recipe);
