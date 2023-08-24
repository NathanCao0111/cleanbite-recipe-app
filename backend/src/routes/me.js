const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");
const uploadFile = require("../config/multer");

router.get("/", meController.getId);
router.get("/created", meController.createdRecipe);
router.post("/create", meController.createRecipe);
router.post(
  "/upload-avatar",
  uploadFile.single("avatar"),
  meController.uploadAvatar
);

module.exports = router;
