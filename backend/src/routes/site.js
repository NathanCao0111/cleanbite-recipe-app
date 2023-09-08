const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const asyncHandler = require("express-async-handler");

router.get("/all", asyncHandler(siteController.all));
router.get("/likes", asyncHandler(siteController.likes));
router.get("/categories/count", asyncHandler(siteController.categoriesCount));
router.post("/send/email", asyncHandler(siteController.sendEmail));
router.get("/:id", asyncHandler(siteController.single));

module.exports = router;
