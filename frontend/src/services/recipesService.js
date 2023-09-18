import axiosInstance from "./axiosInstance";
import { RecipesApi } from "../constants/apis";

const recipesService = {
  all: async () => await axiosInstance.get(RecipesApi.GET_ALL_RECIPES),
  created: async (archived, page) =>
    await axiosInstance.get(
      `/recipes/created?archived=${archived}&page=${page}`
    ),
  search: async (title, page) =>
    await axiosInstance.get(`/recipes/search?title=${title}&page=${page}`),
  favorites: async (mostLiked, page) =>
    await axiosInstance.get(
      `/recipes/likes?mostLiked=${mostLiked}&page=${page}`
    ),
  single: async (values) =>
    await axiosInstance.get(`/recipes/single/${values}`),
  archived: async (deletedAt, page) =>
    await axiosInstance.get(
      `/recipes/archived?deletedAt=${deletedAt}&page=${page}`
    ),
  archivedSingle: async (values) =>
    await axiosInstance.get(`/recipes/archived/${values}`),
  create: async (values) => {
    await axiosInstance.post(RecipesApi.CREATE_RECIPE, values);
  },
  uploadRecipeImg: async (values) => {
    return await axiosInstance.post(RecipesApi.CREATE_RECIPE_IMAGE, values);
  },
  update: async (values) => {
    await axiosInstance.put(RecipesApi.UPDATE_RECIPE, values);
  },
  updateFavorites: async (values) => {
    return await axiosInstance.put(`/recipes/like/${values}`);
  },
  restore: async (values) => {
    await axiosInstance.patch(`/recipes/restore/${values}`);
  },
  delete: async (values) =>
    await axiosInstance.delete(`/recipes/delete/${values}`),
  destroy: async (values) =>
    await axiosInstance.delete(`/recipes/destroy/${values}`),
};

export default recipesService;
