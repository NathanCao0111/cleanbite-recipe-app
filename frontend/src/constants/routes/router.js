import { PathRoute } from "./path";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Recipes from "../../pages/Recipes";
import CreatedRecipe from "../../pages/CreatedRecipe";
import SingleRecipe from "../../pages/SingleRecipe";
import CreateRecipe from "../../pages/CreateRecipe";
import Archived from "../../pages/Archived";
import Categories from "../../pages/Categories";
import Category from "../../pages/Category";
import Favorites from "../../pages/Favorites";
import UpdateRecipe from "../../pages/UpdateRecipe";
import NotFound from "../../pages/404NotFound";

const routes = [
  {
    path: PathRoute.Register,
    component: Register,
    isPrivate: false,
  },
  {
    path: PathRoute.Login,
    component: Login,
    isPrivate: false,
  },
  {
    path: PathRoute.Profile,
    component: Profile,
    isPrivate: true,
  },
  {
    path: PathRoute.Recipes,
    component: Recipes,
    isPrivate: true,
  },
  {
    path: PathRoute.CreatedRecipe,
    component: CreatedRecipe,
    isPrivate: true,
  },
  {
    path: PathRoute.SingleRecipe,
    component: SingleRecipe,
    isPrivate: true,
  },
  {
    path: PathRoute.CreateRecipe,
    component: CreateRecipe,
    isPrivate: true,
  },
  {
    path: PathRoute.Archived,
    component: Archived,
    isPrivate: true,
  },
  {
    path: PathRoute.Categories,
    component: Categories,
    isPrivate: true,
  },
  {
    path: PathRoute.Category,
    component: Category,
    isPrivate: true,
  },
  {
    path: PathRoute.Favorites,
    component: Favorites,
    isPrivate: true,
  },
  {
    path: PathRoute.UpdateRecipe,
    component: UpdateRecipe,
    isPrivate: true,
  },
  {
    path: PathRoute.Home,
    component: Home,
    isPrivate: false,
  },
  {
    path: PathRoute.NotFound,
    component: NotFound,
    isPrivate: false,
  },
];

export default routes;
