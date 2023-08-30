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

const NutritionSchema = new Schema(
  {
    kcal: String,
    fat: String,
    saturates: String,
    carbs: String,
    sugars: String,
    fibre: String,
    protein: String,
    salt: String,
  },
  { _id: false }
);

const RecipeSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true, maxLength: 300 },
    cuisine: { type: String, trim: true },
    level: { type: String, required: true },
    ingredients: { type: Array, required: true },
    method: { type: Array, required: true },
    time: TimeSchema,
    serves: { type: String, required: true },
    image: { type: String, trim: true, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nutrition: NutritionSchema,
    date: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

RecipeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Recipe", RecipeSchema);
