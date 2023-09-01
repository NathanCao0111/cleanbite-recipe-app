import axiosInstance from "./axiosInstance";
import { RecipesApi } from "../constants/apis";

const recipesService = {
  create: async (values) => {
    await axiosInstance.post(RecipesApi.CREATE_RECIPE, values);
  },
  created: async () => {
    await axiosInstance.get(RecipesApi.GET_CREATED_RECIPES);
  },
};

export default recipesService;
