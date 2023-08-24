import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../../../scss/components/Header.module.scss";
import AuthContext from "../../../contexts/AuthContext/AuthContext";
import { Button } from "reactstrap";

function Header() {
  const { auth, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    // remove token from localStorage
    localStorage.removeItem("accessToken");

    // set auth state back to default
    handleLogout();

    // navigate to login
    navigate("/login");
  };

  return (
    <header className={styles.container}>
      <h3>Cleanbite</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          {!auth.isAuthenticated && (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
          {!auth.isAuthenticated && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {auth.isAuthenticated && (
            <li>
              <Button color="secondary" onClick={handleLogoutBtn}>
                Logout
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
