import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;
  const accessToken = localStorage.getItem("accessToken");

  if (!isAuthenticated && !accessToken) {
    return <Navigate to="/login" />;
  }

  return <Component />;
}

export default PrivateRoute;

// Private Route
// check auth | !auth
// auth => target page
// !auth => login
