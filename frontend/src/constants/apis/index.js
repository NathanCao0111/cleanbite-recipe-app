export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MeApi = {
  GET_ME: "/me/info",
  UPLOAD_AVATAR: "/me/upload-avatar",
  DELETE_AVATAR: "/me/delete-avatar",
  UPDATE_PROFILE: "/me/update/profile",
  DELETE_ACCOUNT: "/me/delete/account",
};

export const RecipesApi = {
  GET_ALL_RECIPES: "/recipes/all",
  GET_SINGLE_RECIPE: "/recipes/single/:id",
  GET_CREATED_RECIPES: "/recipes/created",
  GET_SEARCH_RECIPES: "/recipes/search",
  GET_LIKES_RECIPES: "/recipes/likes",
  GET_ARCHIVED_RECIPES: "/recipes/archived",
  GET_ARCHIVED_RECIPE: "/recipes/archived/:id",
  CREATE_RECIPE: "/recipes/create",
  CREATE_RECIPE_IMAGE: "/recipes/upload-recipe-image",
  UPDATE_RECIPE: "/recipes/update/:id",
  UPDATE_LIKE_RECIPE: "/recipes/like/:id",
  RESTORE_RECIPE: "/recipes/restore/:id",
  DELETE_RECIPE: "/recipes/delete/:id",
  DESTROY_RECIPE: "/recipes/destroy/:id",
};

export const SiteApi = {
  GET_MOST_LIKES_RECIPES: "/likes",
  GET_CATEGORIES_COUNT: "/categories/count",
  SEND_SUBSCRIBE_MAIL: "/send/email",
};

export const UserApi = {
  CREATE_REGISTER: "/users/auth/register",
  CREATE_LOGIN: "/users/auth/login",
};
