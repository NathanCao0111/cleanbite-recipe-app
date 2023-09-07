export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MeApi = {
  GET_ME: "/me",
  UPLOAD_AVATAR: "/me/upload-avatar",
  DELETE_AVATAR: "/me/delete-avatar",
  UPDATE_PROFILE: "/me/update/profile",
  DELETE_ACCOUNT: "/me/delete/account",
};

export const RecipesApi = {
  GET_ALL_RECIPES: "/recipes/all",
  GET_CREATED_RECIPES: "/recipes/created",
  CREATE_RECIPE: "/recipes/create",
  UPDATE_RECIPE: "/recipes/update/:id",
  RESTORE_RECIPE: "/recipes/restore/:id",
  DELETE_RECIPE: "/recipes/delete/:id",
  DESTROY_RECIPE: "/recipes/destroy/:id",
};

export const SiteApi = {
  GET_MOST_LIKES_RECIPES: "/likes",
};

export const UserApi = {
  CREATE_REGISTER: "/users/auth/register",
  CREATE_LOGIN: "/users/auth/login",
};
