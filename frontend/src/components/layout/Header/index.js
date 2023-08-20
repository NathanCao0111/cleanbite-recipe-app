import { NavLink } from "react-router-dom";
import styles from "../../../scss/components/Header.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <h3>Cleanbite</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
