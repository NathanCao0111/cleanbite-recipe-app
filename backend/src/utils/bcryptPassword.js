const bcrypt = require("bcrypt");

const bcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

module.exports = bcryptPassword;
