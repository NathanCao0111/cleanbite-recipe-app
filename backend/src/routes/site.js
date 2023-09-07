const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const asyncHandler = require("express-async-handler");

router.get("/all", asyncHandler(siteController.all));
router.get("/:id", asyncHandler(siteController.single));
router.get("/likes", asyncHandler(siteController.likes));

module.exports = router;
