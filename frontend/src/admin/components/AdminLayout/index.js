import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';

function AdminLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem('adminToken'));
    if (adminToken !== md5('nathancao0111@gmail.com')) {
      navigate('/admin/login');
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <AdminSidebar className={styles.sidebar} />
      <div className={styles.container}>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
