const Recipe = require("../models/Recipe");
const resClientData = require("../../utils/resClientData");
const cloudinaryFile = require("../../services/cloudinary/cloudinaryForRecipe");
const fs = require("fs");

class RecipesController {
  // [GET] /api/v1/recipes/all
  async all(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    const data = await Recipe.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!data.length) {
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
  async created(req, res) {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const date = req.query.date || "desc";
    let data;

    if (date === "desc" || !!date) {
      data = await Recipe.find({ userId: id })
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);
    }

    if (date === "asc") {
      data = await Recipe.find({ userId: id })
        .sort({
          createdAt: 1,
        })
        .skip(skip)
        .limit(limit);
    }

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

  // [GET] /api/v1/recipes/categories
  async categories(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { types } = req.query;
    let data;
    let dataCount;

    if (!types) {
      data = await Recipe.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      dataCount = await Recipe.countDocuments();
    } else {
      data = await Recipe.find({ categories: { $in: types?.split(",") } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      dataCount = await Recipe.countDocuments({
        categories: { $in: types?.split(",") },
      });
    }

    if (!data.length) {
      res.status(404);
      throw new Error("Recipes not found");
    }

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

  // [GET] /api/v1/recipes/likes
  async likes(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const userId = req.user.id;
    const mostLiked = req.query.mostLiked || "desc";
    let likedRecipes;

    if (mostLiked === "desc" || !!mostLiked) {
      likedRecipes = await Recipe.find({
        likesBy: { $in: [userId] },
      })
        .sort({ likes: -1 })
        .skip(skip)
        .limit(limit);
    }

    if (mostLiked === "asc") {
      likedRecipes = await Recipe.find({
        likesBy: { $in: [userId] },
      })
        .sort({ likes: 1 })
        .skip(skip)
        .limit(limit);
    }

    if (!likedRecipes.length) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    const likedRecipesCount = await Recipe.countDocuments({
      likesBy: { $in: [userId] },
    });

    resClientData(res, 200, {
      pagination: {
        totalDocuments: likedRecipesCount,
        totalPages: Math.ceil(likedRecipesCount / limit),
        pageSize: limit,
        currentPage: page,
      },
      data: likedRecipes,
    });
  }

  // [PUT] /api/v1/recipes/like/:id
  async like(req, res) {
    const recipeId = req.params.id;
    const userId = req.user.id;

    const findRecipe = await Recipe.findOne({
      _id: recipeId,
    });

    console.log(findRecipe);

    if (!findRecipe) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    let updatedRecipe;

    if (findRecipe.likesBy.includes(userId)) {
      updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          $pull: { likesBy: userId },
        },
        { new: true }
      );

      updatedRecipe.likes -= 1;
      await updatedRecipe.save();
    } else {
      updatedRecipe = await Recipe.findOneAndUpdate(
        { _id: recipeId },
        {
          $push: { likesBy: userId },
        },
        { new: true }
      );

      updatedRecipe.likes += 1;
      await updatedRecipe.save();
    }

    resClientData(res, 200, updatedRecipe);
  }

  // [GET] /api/v1/recipes/search
  async search(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const keywords = req.query.title;
    let data;
    let dataCount;

    if (!keywords) {
      data = await Recipe.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      dataCount = await Recipe.countDocuments();
    } else {
      data = await Recipe.find({ title: { $regex: keywords, $options: "i" } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      dataCount = await Recipe.countDocuments({
        title: { $regex: keywords, $options: "i" },
      });
    }

    if (!data.length) {
      res.status(404);
      throw new Error("Recipes not found");
    }

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
  async single(req, res) {
    const recipeId = req.params.id;
    const data = await Recipe.findOne({ _id: recipeId });

    if (!data) {
      res.status(404);
      throw new Error("Recipe not found");
    }

    resClientData(res, 200, data);
  }

  // [GET] /api/v1/recipes/archived
  async archived(req, res) {
    const data = await Recipe.findDeleted();

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    resClientData(res, 200, data);
  }

  // [GET] /api/v1/recipes/archived/:id
  async archivedSingle(req, res) {
    const userId = req.user.id;
    const recipeId = req.params.id;

    const data = await Recipe.findOneDeleted({ _id: recipeId, userId: userId });

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
      categories,
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
      categories,
      likes: 0,
      likesBy: [],
    });

    resClientData(res, 201, recipe);
  }

  // [POST] /api/v1/recipes/upload-single-image
  async uploadRecipeImage(req, res) {
    // step 1: add file from client to server
    const file = req.file;

    // step 2: upload file to cloudinary => url
    const result = await cloudinaryFile(file);

    // step 3: remove temporary image
    fs.unlinkSync(file.path);

    // step 4: response secure url to FE
    const recipeImgUrl = result && result.secure_url;

    resClientData(res, 200, recipeImgUrl);
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

    if (!recipe.length) {
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
