import * as Yup from "yup";

export const recipeSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Title is too short!")
    .max(100, "Title is too long!")
    .required("Title is a required field!"),
  description: Yup.string()
    .min(1, "Description is too short!")
    .max(300, "Description is too long!")
    .required("Description is a required field!"),
  cuisine: Yup.string().optional(),
  level: Yup.string().optional(),
  ingredients: Yup.array().required("Ingredients is a required field!"),
  method: Yup.array().required("Method is a required field!"),
  time: Yup.object().shape({
    preparation: Yup.string()
      .min(1, "Preparation time is too short!")
      .max(100, "Preparation time is too long!")
      .required("Preparation Time is a required field!"),
    cooking: Yup.string()
      .min(1, "Cooking time is too short!")
      .max(100, "Cooking time is too long!")
      .required("Cooking Time is a required field!"),
  }),
  serves: Yup.string()
    .min(1, "Serves is too short!")
    .max(100, "Serves is too long!")
    .required("Serves is a required field!"),
  image: Yup.string().url(),
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
  categories: Yup.array().optional(),
});
