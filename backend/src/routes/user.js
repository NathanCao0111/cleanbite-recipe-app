const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const validateMdw = require("../middlewares/validateMdw");
const loginSchema = require("../validations/login");
const registerSchema = require("../validations/register");
const asyncHandler = require("express-async-handler");

router.post(
  "/auth/register",
  validateMdw(registerSchema),
  asyncHandler(userController.register)
);
router.post(
  "/auth/login",
  validateMdw(loginSchema),
  asyncHandler(userController.login)
);

module.exports = router;
