const resClientData = require("../utils/resClientData");

const validateMdw = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    resClientData(res, 400, null, error.errors.join(", "));
  }
};

module.exports = validateMdw;
