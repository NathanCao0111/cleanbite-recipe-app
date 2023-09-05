import axiosInstance from "./axiosInstance";
import { RecipesApi } from "../constants/apis";

const recipesService = {
  all: async () => await axiosInstance.get(RecipesApi.GET_ALL_RECIPES),
  created: async () => await axiosInstance.get(RecipesApi.GET_CREATED_RECIPES),
  single: async () => await axiosInstance.get(RecipesApi.GET_SINGLE_RECIPE),
  create: async (values) => {
    await axiosInstance.post(RecipesApi.CREATE_RECIPE, values);
  },
  update: async (values) => {
    await axiosInstance.put(RecipesApi.UPDATE_RECIPE, values);
  },
  restore: async (values) => {
    await axiosInstance.patch(RecipesApi.RESTORE_RECIPE, values);
  },
  delete: async () => await axiosInstance.delete(RecipesApi.DELETE_RECIPE),
  destroy: async () => await axiosInstance.delete(RecipesApi.DESTROY_RECIPE),
};

export default recipesService;
