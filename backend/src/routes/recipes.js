const express = require("express");
const router = express.Router();

const recipesController = require("../app/controllers/RecipesController");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(recipesController.index));
router.get("/created", asyncHandler(recipesController.createdRecipe));
router.post("/create", asyncHandler(recipesController.createRecipe));

module.exports = router;
