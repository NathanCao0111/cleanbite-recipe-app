import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Register.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      .min(2, "Too short!")
      .max(70, "Too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(
        /[0-9]/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      )
      .matches(
        /[a-z]/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      )
      .matches(
        /[A-Z]/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      )
      .matches(
        /[^\w]/,
        "Password requires a number, a lowercase letter, an uppercase letter & a symbol"
      ),
  });

  const handleRegisterSubmit = async (values) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3001/users/auth/register",
        values
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
