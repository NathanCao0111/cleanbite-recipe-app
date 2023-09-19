import styles from './AdminLogin.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import useProducts from '../../../context/useProducts';
import md5 from 'md5';

function AdminLogin() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [incorrectNotify, setIncorrectNotify] = useState(false);
  const adminData = useProducts();
  const [adminLoggedin, setAdminLoggedin] = adminData.adminLoggedinContext;

  useEffect(() => {
    if (incorrectNotify) {
      const timer = setTimeout(() => {
        setIncorrectNotify(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [incorrectNotify]);

  useEffect(() => {
    if (adminLoggedin) {
      const timer = setTimeout(() => {
        navigate('/admin');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [adminLoggedin]);

  const handleLoginSubmit = (values) => {
    const { email, password } = values;
    const hashed = md5(email);
    if (email === 'nathancao0111@gmail.com' && password === '12345678') {
      const adminToken = JSON.stringify(hashed);
      localStorage.setItem('adminToken', adminToken);
      setAdminLoggedin(true);
    } else {
      setIncorrectNotify(true);
    }
  };

  return (
    <section className={styles.container}>
      <div className={clsx(styles.notify, incorrectNotify === true ? styles.slideIn : '')}>
        <p>
          Incorrect email address or password &nbsp;
          <span>
            <FontAwesomeIcon icon={faXmarkSquare} />
          </span>
        </p>
      </div>
      <div className={styles.content}>
        <h3>ADMIN LOGIN</h3>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoginSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className={styles.inputContainer}>
                <label htmlFor="email">Email address</label>
                <Field id="email" name="email" type="email" placeholder="E.g. johnsmith@gmail.com" spellCheck={false} />
                <ErrorMessage name="email">{(msg) => <div className={styles.error}>{msg}</div>}</ErrorMessage>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="password">Password</label>
                <Field id="password" name="password" type="password" />
                <ErrorMessage name="password">{(msg) => <div className={styles.error}>{msg}</div>}</ErrorMessage>
              </div>
              <button type="submit">LOGIN</button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default AdminLogin;
