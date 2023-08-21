const resClientData = require("../../utils/resClientData");
const User = require("../models/User");

class MeController {
  // [GET] /api/v1/me/
  async getId(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findOne({ _id: id }).select("-password");
      resClientData(res, 200, user);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new MeController();
