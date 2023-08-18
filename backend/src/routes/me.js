const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");

router.get("/:id", meController.getId);

module.exports = router;
