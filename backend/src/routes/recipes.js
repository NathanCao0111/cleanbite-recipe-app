const express = require("express");
const router = express.Router();

const recipesController = require("../app/controllers/RecipesController");
const asyncHandler = require("express-async-handler");
const validateMdw = require("../middlewares/validateMdw");
const recipeSchema = require("../validations/recipe");
const uploadFile = require("../config/multer");

router.get("/all", asyncHandler(recipesController.all));
router.get("/created", asyncHandler(recipesController.created));
router.get("/archived", asyncHandler(recipesController.archived));
router.get("/categories", asyncHandler(recipesController.categories));
router.get("/likes", asyncHandler(recipesController.likes));
router.put("/like/:id", asyncHandler(recipesController.like));
router.get("/search", asyncHandler(recipesController.search));
router.post(
  "/create",
  validateMdw(recipeSchema),
  asyncHandler(recipesController.createRecipe)
);
router.post(
  "/upload-recipe-image",
  uploadFile.single("image"),
  asyncHandler(recipesController.uploadRecipeImage)
);
router.get("/:id", asyncHandler(recipesController.single));
router.get("/archived/:id", asyncHandler(recipesController.archivedSingle));
router.put(
  "/update/:id",
  validateMdw(recipeSchema),
  asyncHandler(recipesController.updateRecipe)
);
router.patch("/restore/:id", asyncHandler(recipesController.restore));
router.delete("/delete/:id", asyncHandler(recipesController.deleteRecipe));
router.delete("/destroy/:id", asyncHandler(recipesController.destroy));

module.exports = router;
