import styles from './AdminSidebar.module.scss';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faCartShopping, faUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../../../assets/images';
import useProducts from '../../../../context/useProducts';

function AdminSidebar(props) {
  const adminData = useProducts();
  const [, setAdminLoggedin] = adminData.adminLoggedinContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminLoggedin(false);
    navigate('/admin/login');
  };

  return (
    <aside className={clsx(styles.sidebar, props.className)}>
      <div className={styles.top}>
        <Link to="/admin">
          <img src={images.cleanAdmin} alt="Clean logo"></img>
        </Link>
      </div>
      <div className={styles.center}>
        <ul>
          <li>
            <Link to="/admin">
              <span>
                <FontAwesomeIcon icon={faTableColumns} />
              </span>
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/products">
              <span>
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <p>Products</p>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <p>Users</p>
            </Link>
          </li>
          <li>
            <Link to="">
              <span>
                <FontAwesomeIcon icon={faGear} />
              </span>
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        {/* <div className={styles.colorContainer}>
          <div className={styles.color}></div>
          <div className={styles.color}></div>
        </div> */}
        <div className={styles.logout} onClick={handleLogout}>
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          <p>Logout</p>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
