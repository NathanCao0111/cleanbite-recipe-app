export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MeApi = {
  GET_ME: "/me",
  UPLOAD_AVATAR: "/me/upload-avatar",
  DELETE_AVATAR: "/me/delete-avatar",
  UPDATE_PROFILE: "/me/update/profile",
  DELETE_ACCOUNT: "/me/delete/account",
};

export const RecipesApi = {
  GET_ALL_RECIPES: "/recipes",
  CREATE_RECIPE: "/recipes/create",
  GET_CREATED_RECIPES: "/recipes/created",
};

export const SiteApi = {
  GET_HOMEPAGE: "/",
};

export const UserApi = {
  CREATE_REGISTER: "/users/auth/register",
  CREATE_LOGIN: "/users/auth/login",
};
