const resClientData = require("../../utils/resClientData");
const { User, Recipe } = require("../models");

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

  // [POST] /api/v1/me/create
  async createRecipe(req, res) {
    try {
      const { id } = req.user;
      const { title, cuisine, ingredients, method, time, serves, image } =
        req.body;
      const recipe = await Recipe.create({
        title,
        cuisine,
        ingredients,
        method,
        time,
        serves,
        image,
        user: id,
      });
      resClientData(res, 200, recipe);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new MeController();
