const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/UserController");

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);

module.exports = router;
