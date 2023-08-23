const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/", meController.getId);
router.post("/create", meController.createRecipe);

module.exports = router;
