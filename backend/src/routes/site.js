const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const asyncHandler = require("express-async-handler");
const validateMdw = require("../middlewares/validateMdw");
const emailSchema = require("../validations/email");

router.get("/all", asyncHandler(siteController.all));
router.get("/likes", asyncHandler(siteController.likes));
router.get("/categories/count", asyncHandler(siteController.categoriesCount));
router.post(
  "/send/email",
  validateMdw(emailSchema),
  asyncHandler(siteController.sendEmail)
);
router.get("/single/:id", asyncHandler(siteController.single));

module.exports = router;
