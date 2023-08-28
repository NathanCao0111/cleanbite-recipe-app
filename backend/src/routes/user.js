const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");
const validateMdw = require("../middlewares/validateMdw");
const loginSchema = require("../validations/login");
const registerSchema = require("../validations/register");

router.post(
  "/auth/register",
  validateMdw(registerSchema),
  userController.register
);
router.post("/auth/login", validateMdw(loginSchema), userController.login);

module.exports = router;
