import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "../../../scss/components/layout/Header.module.scss";
import AuthContext from "../../../contexts/AuthContext/AuthContext";
import { Dropdown, Space, Spin } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { auth, authLoading, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        <Link
          to="/recipes/created"
          style={{ textDecoration: "none", fontSize: 16 }}
        >
          Created Recipes
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          to="/recipes/likes"
          style={{ textDecoration: "none", fontSize: 16 }}
        >
          Favorites
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          to="/recipes/archived"
          style={{ textDecoration: "none", fontSize: 16 }}
        >
          Archived
        </Link>
      ),
      key: "3",
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
      key: "4",
    },
  ];

  const notAuthenticatedNav = (
    <>
      <li>
        <Link
          className={clsx(styles.navLink, styles.mobileDisplay)}
          to="/login"
        >
          Recipes
        </Link>
      </li>
      <li>
        <Link
          className={clsx(styles.navLink, styles.mobileDisplay)}
          to="/login"
        >
          Create a Recipe
        </Link>
      </li>
      {authLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <li>
            <Link className={clsx(styles.navAuth)} to="/login">
              Log in
            </Link>
          </li>
          <div className={styles.line}></div>
          <li>
            <Link className={clsx(styles.navAuth)} to="/register">
              Register
            </Link>
          </li>
        </>
      )}
      <li>
        <FontAwesomeIcon
          icon={faBars}
          className={clsx(styles.hamburger)}
          onClick={() => setMobileNavOpen(true)}
        />
      </li>
      <div
        className={clsx(
          styles.mobileNavFull,
          mobileNavOpen ? styles.openFlex : styles.closeFlex
        )}
      >
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setMobileNavOpen(false)}
        />
        <div className={styles.mobileLinks}>
          <Link
            to="/login"
            className={clsx(styles.navItem, styles.link)}
            onClick={() => {
              setMobileNavOpen(false);
            }}
          >
            Recipes
          </Link>
          <Link
            to="/login"
            className={clsx(styles.navItem, styles.link)}
            onClick={() => setMobileNavOpen(false)}
          >
            Create a Recipe
          </Link>
        </div>
      </div>
    </>
  );

  const isAuthenticatedNav = (
    <>
      <li>
        <Link
          className={clsx(styles.navLink, styles.mobileDisplay)}
          to="/recipes/all"
        >
          Recipes
        </Link>
      </li>
      <li>
        <Link
          className={clsx(styles.navLink, styles.mobileDisplay)}
          to="/recipes/create"
        >
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
      <li>
        <FontAwesomeIcon
          icon={faBars}
          className={clsx(styles.hamburger)}
          onClick={() => setMobileNavOpen(true)}
        />
      </li>
      <div
        className={clsx(
          styles.mobileNavFull,
          mobileNavOpen ? styles.openFlex : styles.closeFlex
        )}
      >
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setMobileNavOpen(false)}
        />
        <div className={styles.mobileLinks}>
          <Link
            to="/recipes/all"
            className={clsx(styles.navItem, styles.link)}
            onClick={() => {
              setMobileNavOpen(false);
            }}
          >
            Recipes
          </Link>
          <Link
            to="/recipes/create"
            className={clsx(styles.navItem, styles.link)}
            onClick={() => setMobileNavOpen(false)}
          >
            Create a Recipe
          </Link>
        </div>
      </div>
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
