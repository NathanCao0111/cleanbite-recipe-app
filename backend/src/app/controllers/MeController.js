const resClientData = require("../../utils/resClientData");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const fs = require("fs");
const cloudinaryFile = require("../../services/cloudinaryFile");

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

  // [GET] /api/v1/me/created
  async createdRecipe(req, res) {
    try {
      const { id } = req.user;
      const createdRecipe = await Recipe.find({ userId: id });
      resClientData(res, 200, createdRecipe);
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

  // [POST] /api/v1/me/upload-avatar
  async uploadAvatar(req, res) {
    try {
      // step 1: add file from client to server
      const file = req.file;
      console.log(file);

      // step 2: upload file to cloudinary => url
      const result = await cloudinaryFile(file);
      console.log(result);

      // step 3: remove temporary image
      fs.unlinkSync(file.path);

      // step 4: save url to MongoDb
      const { id } = req.user;
      const avatarUrl = result && result.secure_url;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { avatar: avatarUrl },
        { new: true } //return updated object
      ).select("-password");

      resClientData(res, 200, updatedUser);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }
}

module.exports = new MeController();
