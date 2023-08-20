import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../../scss/pages/Register.module.scss";

function Register() {
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

  const handleRegisterSubmit = async () => {};

  return (
    <div className={styles.container}>
      <h3>Register</h3>
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
