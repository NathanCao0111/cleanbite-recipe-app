const express = require("express");
const router = express.Router();

const recipesController = require("../app/controllers/RecipesController");

router.get("/", recipesController.index);

module.exports = router;
