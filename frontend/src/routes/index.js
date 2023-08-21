import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const routes = [
  {
    path: "/",
    component: Home,
    isPrivate: false,
  },
  {
    path: "/register",
    component: Register,
    isPrivate: false,
  },
  {
    path: "/login",
    component: Login,
    isPrivate: false,
  },
  {
    path: "/profile",
    component: Profile,
    isPrivate: true,
  },
];

export default routes;
