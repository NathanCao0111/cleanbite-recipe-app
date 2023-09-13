import * as Yup from "yup";

export const recipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Too short!")
    .max(100, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .required(),
  description: Yup.string()
    .min(1, "Too short!")
    .max(300, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .required(),
  cuisine: Yup.string().optional(),
  level: Yup.string()
    .min(1, "Too short!")
    .max(100, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .optional(),
  ingredients: Yup.array().required(),
  method: Yup.array().required(),
  time: Yup.object().shape({
    preparation: Yup.string()
      .min(1, "Too short!")
      .max(100, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
    cooking: Yup.string()
      .min(1, "Too short!")
      .max(100, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
  }),
  serves: Yup.string()
    .min(1, "Too short!")
    .max(100, "Too long!")
    .trim("Cannot include leading and trailing spaces")
    .required(),
  image: Yup.mixed()
    .required("Please upload a recipe image")
    .test(
      "fileSize",
      "File size too large",
      (value) => value && value.size <= 10000000
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
          value.type
        )
    ),
  nutrition: Yup.object().shape({
    kcal: Yup.string().optional(),
    fat: Yup.string().optional(),
    saturates: Yup.string().optional(),
    carbs: Yup.string().optional(),
    sugars: Yup.string().optional(),
    fibre: Yup.string().optional(),
    protein: Yup.string().optional(),
    salt: Yup.string().optional(),
  }),
  categories: Yup.array(),
});
