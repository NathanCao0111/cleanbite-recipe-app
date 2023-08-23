import { PathRoute } from "./path";
import Home from "../../pages/Home";
import Register from "../../pages/Register";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";

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
    path: PathRoute.Home,
    component: Home,
    isPrivate: false,
  },
];

export default routes;
