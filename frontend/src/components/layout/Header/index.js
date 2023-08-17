import { NavLink } from "react-router-dom";

function Header() {
  <div className="header-container">
    <h1>KBook Social</h1>
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
  </div>;
}

export default Header;
