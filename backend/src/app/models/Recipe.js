const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const TimeSchema = new Schema(
  {
    preparation: {
      type: String,
      minLength: 1,
      maxLength: 100,
      trim: true,
      required: true,
    },
    cooking: {
      type: String,
      minLength: 1,
      maxLength: 100,
      trim: true,
      required: true,
    },
  },
  { _id: false }
);

const NutritionSchema = new Schema(
  {
    kcal: { type: String, trim: true },
    fat: { type: String, trim: true },
    saturates: { type: String, trim: true },
    carbs: { type: String, trim: true },
    sugars: { type: String, trim: true },
    fibre: { type: String, trim: true },
    protein: { type: String, trim: true },
    salt: { type: String, trim: true },
  },
  { _id: false }
);

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 1,
      maxLength: 100,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      minLength: 1,
      maxLength: 300,
      trim: true,
      required: true,
    },
    cuisine: { type: String, trim: true },
    level: {
      type: String,
      minLength: 1,
      maxLength: 100,
      trim: true,
      required: true,
    },
    ingredients: { type: Array, required: true },
    method: { type: Array, required: true },
    time: TimeSchema,
    serves: {
      type: String,
      minLength: 1,
      maxLength: 100,
      trim: true,
      required: true,
    },
    image: { type: String, trim: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nutrition: NutritionSchema,
    likes: Number,
    likesBy: Array,
    categories: { type: Array, required: true },
    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Recipe", RecipeSchema);
