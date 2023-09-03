const Recipe = require("../models/Recipe");
const resClientData = require("../../utils/resClientData");

class RecipesController {
  // [GET] /api/v1/recipes/all
  async all(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
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

  // [GET] /api/v1/recipes/created
  async createdRecipe(req, res) {
    const { id } = req.user;
    const createdRecipe = await Recipe.find({ userId: id });

    if (!createdRecipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, createdRecipe);
  }

  // [GET] /api/v1/recipes/:id
  async getId(req, res) {}

  // [POST] /api/v1/recipes/create
  async createRecipe(req, res) {
    const { id } = req.user;
    const {
      title,
      description,
      cuisine,
      level,
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
      level,
      ingredients,
      method,
      time,
      serves,
      image,
      userId: id,
      nutrition,
    });

    resClientData(res, 201, recipe);
  }

  // [PUT] /api/v1/recipes/update/:id
  async updateRecipe(req, res) {}

  // [DELETE] /api/v1/recipes/delete
  async deleteRecipe(req, res) {}
}

module.exports = new RecipesController();
