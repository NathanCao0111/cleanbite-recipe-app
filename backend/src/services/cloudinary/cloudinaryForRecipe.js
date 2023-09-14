const { v2: cloudinary } = require("cloudinary");
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryFile = async (file) => {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "auto",
    folder: "cleanbite-recipe-app/recipes",
  });

  return result;
};

module.exports = cloudinaryFile;
