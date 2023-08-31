const asyncHandler = require("express-async-handler");

const validateMdw = (schema) =>
  asyncHandler(async (req, res, next) => {
    await schema.validate(req.body);
    next();
  });

module.exports = validateMdw;
