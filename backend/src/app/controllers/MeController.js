const resClientData = require("../../utils/resClientData");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const fs = require("fs");
const cloudinaryFile = require("../../services/cloudinary");
const bcryptPassword = require("../../utils/bcryptPassword");

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
      const {
        title,
        description,
        cuisine,
        ingredients,
        method,
        time,
        serves,
        image,
        nutrition,
      } = req.body;
      const recipe = await Recipe.create({
        title,
        description,
        cuisine,
        ingredients,
        method,
        time,
        serves,
        image,
        user: id,
        nutrition,
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

  // [DELETE] /api/v1/me/delete-avatar
  async deleteAvatar(req, res) {
    try {
      const { id } = req.user;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { avatar: "" },
        { new: true }
      ).select("-password");
      resClientData(res, 200, updatedUser);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [PUT] /api/v1/me/update/profile
  async updateProfile(req, res) {
    try {
      const { id } = req.user;
      const { fullname, username, email } = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          fullname,
          username,
          email,
        },
        { new: true }
      ).select("-password");
      resClientData(res, 200, updatedUser);
    } catch (error) {
      resClientData(res, 400, null, error.message);
    }
  }

  // [DELETE] /api/v1/me/delete/account
  async deleteAccount(req, res) {
    try {
      const { id } = req.user;
      const deletedUser = await User.delete({ _id: id });
      resClientData(res, 200, deletedUser);
    } catch (error) {
      resClientData(res, 200, null, error.message);
    }
  }
}

module.exports = new MeController();
