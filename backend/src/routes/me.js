const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");
const uploadFile = require("../config/multer");
const asyncHandler = require("express-async-handler");

router.get("/", asyncHandler(meController.getId));
router.get("/created", asyncHandler(meController.createdRecipe));
router.post("/create", asyncHandler(meController.createRecipe));
router.put("/update/profile", asyncHandler(meController.updateProfile));
router.post(
  "/upload-avatar",
  uploadFile.single("avatar"),
  asyncHandler(meController.uploadAvatar)
);
router.delete("/delete-avatar", asyncHandler(meController.deleteAvatar));
router.delete("/delete/account", asyncHandler(meController.deleteAccount));

module.exports = router;
