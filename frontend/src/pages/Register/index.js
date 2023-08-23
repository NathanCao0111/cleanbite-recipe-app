import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Register.module.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import AuthContext from "../../contexts/AuthContext/AuthContext";

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
      .min(8, "Password must be 8 characters long")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      ),
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.container}>
      <h3>Register</h3>
      <div className="form">
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className={styles.inputContainer}>
                  <label htmlFor="fullname">Full name</label>
                  <Field
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="E.g. John Smith"
                    spellCheck={false}
                  />
                  <ErrorMessage name="fullname">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    placeholder="E.g. johnsmith"
                    spellCheck={false}
                  />
                  <ErrorMessage name="username">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
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
                {error && <p className={styles.axiosError}>{error}</p>}
                <button type="submit">
                  {loading ? "Loading..." : "Register"}
                </button>
                <p>
                  <Link to="/login">
                    Already have an account? <span>Log in</span>
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

export default Register;
