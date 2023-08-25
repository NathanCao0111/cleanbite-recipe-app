import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Register.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AntdButton from "../../utils/Button";
import Notification from "../../utils/Notification";
import { NotificationType } from "../../constants/NotificationType";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const initialValues = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too short!")
      .max(70, "Too long!")
      .required("Required"),
    username: Yup.string()
      .min(6, "Too short!")
      .max(20, "Too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      )
      .required("Required"),
  });

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      await authService.register(values);
      navigate("/login");
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
      <h3>Register</h3>
      <div className={styles.container}>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ errors, touched }) => {
              return (
                <Form>
                  <div className={styles.inputContainer}>
                    <div className={styles.input}>
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Field
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="Full name"
                        spellCheck={false}
                      />
                    </div>
                    <ErrorMessage name="fullname">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className={styles.inputContainer}>
                    <div className={styles.input}>
                      <span>
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        spellCheck={false}
                      />
                    </div>
                    <ErrorMessage name="username">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </div>
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
                  {error && <p className={styles.axiosError}>{error}</p>}
                  <AntdButton
                    description={loading ? "Loading..." : "Register"}
                  />
                  <p className={styles.subDescription}>
                    Already have an account? <Link to="/login">Log in</Link>
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

export default Register;
