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

  // [GET] /api/v1/recipes/created
  async createdRecipe(req, res) {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const data = await Recipe.find({ userId: id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    const dataCount = await Recipe.countDocuments({ userId: id });

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

  // [GET] /api/v1/recipes/:id
  async getId(req, res) {
    const recipeId = req.params.id;
    const data = await Recipe.findOne({ _id: recipeId });

    if (!data) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, data);
  }

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
  async updateRecipe(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const recipe = await Recipe.findOneAndUpdate(
      {
        _id: recipeId,
        userId: userId,
      },
      req.body,
      { new: true }
    );

    if (!recipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, recipe);
  }

  // [DELETE] /api/v1/recipes/delete/:id
  async deleteRecipe(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const recipe = await Recipe.delete({ _id: recipeId, userId: userId });

    if (recipe.modifiedCount === 0) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, recipe);
  }

  // [PATCH] /api/v1/recipes/restore/:id
  async restore(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const recipe = await Recipe.restore({ _id: recipeId, userId: userId });

    if (recipe.modifiedCount === 0) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, recipe);
  }

  // [DELETE] /api/v1/recipes/destroy/:id
  async destroy(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const recipe = await Recipe.deleteOne({ _id: recipeId, userId: userId });

    if (recipe.deletedCount === 0) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, recipe);
  }
}

module.exports = new RecipesController();
