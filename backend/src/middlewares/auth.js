const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(403);
    throw new Error("A token is needed to access");
  }
  const decoded = jwt.verify(token, SECRET_KEY);
  req.user = decoded;
  return next();
});

module.exports = auth;
