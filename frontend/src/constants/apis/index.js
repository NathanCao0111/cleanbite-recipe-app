export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const MeApi = {
  GET_ME: "/me",
  CREATE_RECIPE: "/me/create",
  GET_CREATED_RECIPES: "/me/created",
};

export const RecipesApi = {
  GET_RECIPES: "/recipes",
};

export const SiteApi = {
  GET_HOMEPAGE: "/",
};

export const UserApi = {
  CREATE_REGISTER: "/users/auth/register",
  CREATE_LOGIN: "/users/auth/login",
};
