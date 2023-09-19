import styles from './AdminHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

function AdminHeader() {
  const [searchInputVisible, setSearchInputVisible] = useState(false);

  const handleSearchInput = () => {
    setSearchInputVisible(true);
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Welcome back, Nathan</h2>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className={styles.right}>
          <div className={styles.navLeft}>
            {!searchInputVisible && (
              <span onClick={handleSearchInput}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
            )}
            {searchInputVisible && (
              <div className={styles.search}>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Search" />
                  <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className={styles.navCenter}>
            <span>
              <FontAwesomeIcon icon={faBell} />
            </span>
            <div className={styles.notification}></div>
          </div>
          <div className={styles.navRight}>
            <div className={styles.ava}>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Admin avatar"
              />
            </div>
            <p>Nathan Cao</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader;
