const asyncHandler = require("express-async-handler");

const validateMdw = (schema) =>
  asyncHandler(async (req, res, next) => {
    const result = await schema.validate(req.body);

    if (!result) {
      res.status(400);
      throw new Error(error.message);
    }

    next();
  });

module.exports = validateMdw;
