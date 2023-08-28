import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const notAuthenticatedNav = (
    <>
      <li>
        <Link className="nav-link" to="/login">
          Log in
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </>
  );

  const isAuthenticatedNav = (
    <>
      <li>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <Button className="btn btn-outline-dark" onClick={handleLogoutBtn}>
          Log out
        </Button>
      </li>
    </>
  );

  const navComponent = auth.isAuthenticated
    ? isAuthenticatedNav
    : notAuthenticatedNav;

  return (
    <header className={styles.wrapper}>
      <h3>
        <Link to="/">Cleanbite</Link>
      </h3>
      <nav>
        <ul>{navComponent}</ul>
      </nav>
    </header>
  );
}

export default Header;
