import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../scss/components/Header.module.scss";
import AuthContext from "../../../contexts/AuthContext/AuthContext";
import { Dropdown, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

  const items = [
    {
      label: (
        <Link to="/profile" style={{ textDecoration: "none", fontSize: 16 }}>
          Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/favorites" style={{ textDecoration: "none", fontSize: 16 }}>
          Favorites
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/archived" style={{ textDecoration: "none", fontSize: 16 }}>
          Archived
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="resetBtn"
          style={{ fontSize: 16 }}
          onClick={handleLogoutBtn}
        >
          Log out
        </button>
      ),
      key: "3",
    },
  ];

  const notAuthenticatedNav = (
    <>
      <li>
        <Link className="nav-link" to="/recipes/all">
          Recipes
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          Create a Recipe
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/login">
          Log in
        </Link>
      </li>
      <div className={styles.line}></div>
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
        <Link className="nav-link" to="/recipes/all">
          Recipes
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/recipes/create">
          Create a Recipe
        </Link>
      </li>
      <li className={styles.drowdown}>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
        >
          <Link onClick={(e) => e.preventDefault()}>
            <Space>
              <div className={styles.hoverMe}>
                <div className={styles.imgContainer}>
                  <img
                    src={
                      auth.user.avatar ||
                      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="avatar"
                  />
                </div>
                <p>{auth.user.username}</p>
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </div>
            </Space>
          </Link>
        </Dropdown>
      </li>
    </>
  );

  const navComponent = auth.isAuthenticated
    ? isAuthenticatedNav
    : notAuthenticatedNav;

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <h3>
          <Link to="/">Cleanbite</Link>
        </h3>
        <nav>
          <ul>{navComponent}</ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
