const resClientData = require("../../utils/resClientData");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

class UserController {
  // [POST] /api/v1/users/auth/register
  async register(req, res) {
    const { fullname, username, email, password } = req.body;

    const existingUser = await User.findOneWithDeleted({ email });
    if (existingUser) {
      res.status(401);
      throw new Error("User has already existed");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullname,
      username,
      email,
      password: encryptedPassword,
    });

    resClientData(res, 201, {}, `User ${email} has been created successfully`);
  }

  // [POST] /api/v1/users/auth/login
  async login(req, res) {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401);
      throw new Error("User is not existed");
    }

    const comparedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparedPassword) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    if (password !== confirmPassword) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const jwtPayload = {
      id: existingUser._id,
      fullname: existingUser.fullname,
      username: existingUser.username,
      email: existingUser.email,
    };
    const token = jwt.sign(jwtPayload, SECRET_KEY, {
      expiresIn: "12h",
    });

    resClientData(res, 200, token, "User logged in successfully");
  }
}

module.exports = new UserController();
