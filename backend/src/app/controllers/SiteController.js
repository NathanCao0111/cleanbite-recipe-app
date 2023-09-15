const Recipe = require("../models/Recipe");
const resClientData = require("../../utils/resClientData");
const nodemailer = require("nodemailer");

class SiteController {
  // [GET] /api/v1/all
  async all(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
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

  // [GET] /api/v1/categories/count
  async categoriesCount(req, res) {
    const data = await Recipe.aggregate([
      { $unwind: "$categories" },
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $project: { _id: 0, categories: "$_id", count: "$count" },
      },
    ]);

    if (!data) {
      res.status(404);
      throw new Error("Recipes not found");
    }

    resClientData(res, 200, data);
  }

  // [POST] /api/v1/send/email
  async sendEmail(req, res) {
    const { recipientEmail } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: "Cleanbite Recipe App",
      text: "Hi, thank you for subscribing Cleanbite Recipe App",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error: " + error.message);
        resClientData(res, 500, null, error.message);
      } else {
        console.log("Email sent: " + info.response);
        resClientData(res, 200, "Email sent successfully");
      }
    });
  }
}

module.exports = new SiteController();
