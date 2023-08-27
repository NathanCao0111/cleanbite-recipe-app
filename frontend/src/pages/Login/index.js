import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Login.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AntdButton from "../../utils/Button";
import Notification from "../../utils/Notification";
import { NotificationType } from "../../constants/NotificationType";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth, handleLogin } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Must match the field password")
      .required("Required"),
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(values);

      const accessToken = response.data.data;
      localStorage.setItem("accessToken", accessToken);

      await handleLogin();

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.wrapper}>
      {error && Notification(error, NotificationType.error)}
      <h3>Login</h3>
      <div className={styles.container}>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className={styles.inputContainer}>
                    <div className={styles.input}>
                      <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        spellCheck={false}
                      />
                    </div>
                    <ErrorMessage name="email">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.input}>
                      <span>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage name="password">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.input}>
                      <span>
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <AntdButton
                    type="primary"
                    description={loading ? "Loading..." : "Log in"}
                  />
                  <p className={styles.subDescription}>
                    Don't have an account yet?{" "}
                    <Link to="/register">Register now</Link>
                  </p>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </section>
  );
}

export default Login;
