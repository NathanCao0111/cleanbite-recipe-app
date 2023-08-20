import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Password must be 8 characters long"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Must match the field password"
    ),
  });

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3001/users/auth/login",
        values
      );
      navigate(-1);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h3>Login</h3>
      <div className="form">
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className={styles.inputContainer}>
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E.g. johnsmith@gmail.com"
                    spellCheck={false}
                  />
                  <ErrorMessage name="email">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="password">Password</label>
                  <Field id="password" name="password" type="password" />
                  <ErrorMessage name="password">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                  />
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit">
                  {loading ? "Loading..." : "Log in"}
                </button>
                <p>
                  <Link to="/register">
                    Don't have an account yet? <span>Register</span>
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default Login;
