const Recipe = require("../models/Recipe");
const resClientData = require("../../utils/resClientData");

class SiteController {
  // [GET] /api/v1/all
  async all(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    const dataCount = await Recipe.countDocuments();

    resClientData(res, 200, {
      pagination: {
        totalDocuments: dataCount,
        totalPages: Math.ceil(dataCount / limit),
        pageSize: limit,
        currentPage: page,
      },
      data: data,
    });
  }

  // [GET] /api/v1/:id
  async single(req, res) {
    const recipeId = req.params.id;
    const data = await Recipe.findOne({ _id: recipeId });

    if (!data) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, data);
  }

  // [GET] /api/v1/likes
  async likes(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const data = await Recipe.find()
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit);

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    const dataCount = await Recipe.countDocuments();

    resClientData(res, 200, {
      pagination: {
        totalDocuments: dataCount,
        totalPages: Math.ceil(dataCount / limit),
        pageSize: limit,
        currentPage: page,
      },
      data: data,
    });
  }

  // [GET] /api/v1/categories
  async categories(req, res) {
    const types = req.query.types || "";
    const arrTypes = types.split(",");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await Recipe.find({ categories: { $all: arrTypes } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    const dataCount = await Recipe.countDocuments();

    resClientData(res, 200, {
      pagination: {
        totalDocuments: dataCount,
        totalPages: Math.ceil(dataCount / limit),
        pageSize: limit,
        currentPage: page,
      },
      data: data,
    });
  }
}

module.exports = new SiteController();
