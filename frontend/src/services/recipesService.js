import axiosInstance from "./axiosInstance";
import { RecipesApi } from "../constants/apis";

const recipesService = {
  all: async () => await axiosInstance.get(RecipesApi.GET_ALL_RECIPES),
  created: async () => await axiosInstance.get(RecipesApi.GET_CREATED_RECIPES),
  search: async (title, page) =>
    await axiosInstance.get(`/recipes/search?title=${title}&page=${page}`),
  favorites: async () => await axiosInstance.get(RecipesApi.GET_LIKES_RECIPES),
  single: async (values) => await axiosInstance.get(`/recipes/${values}`),
  create: async (values) => {
    await axiosInstance.post(RecipesApi.CREATE_RECIPE, values);
  },
  uploadRecipeImg: async (values) => {
    await axiosInstance.post(RecipesApi.CREATE_RECIPE_IMAGE, values);
  },
  update: async (values) => {
    await axiosInstance.put(RecipesApi.UPDATE_RECIPE, values);
  },
  updateFavorites: async (values) => {
    return await axiosInstance.put(`/recipes/like/${values}`);
  },
  restore: async (values) => {
    await axiosInstance.patch(RecipesApi.RESTORE_RECIPE, values);
  },
  delete: async () => await axiosInstance.delete(RecipesApi.DELETE_RECIPE),
  destroy: async () => await axiosInstance.delete(RecipesApi.DESTROY_RECIPE),
};

export default recipesService;
