const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/MeController");
const uploadFile = require("../config/multer");
const asyncHandler = require("express-async-handler");

router.get("/info", asyncHandler(meController.getId));
router.post(
  "/upload-avatar",
  uploadFile.single("avatar"),
  asyncHandler(meController.uploadAvatar)
);
router.put("/update/profile", asyncHandler(meController.updateProfile));
router.delete("/delete-avatar", asyncHandler(meController.deleteAvatar));
router.delete("/delete/account", asyncHandler(meController.deleteAccount));

module.exports = router;
