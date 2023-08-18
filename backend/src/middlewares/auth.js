const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const resClientData = require("../utils/resClientData");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new Error("A token is needed to access");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return resClientData(res, 403, null, error.message);
    }
    return resClientData(res, 401, null, error.message);
  }
};

module.exports = auth;
