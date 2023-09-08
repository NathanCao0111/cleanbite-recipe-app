import styles from "../../../../scss/pages/Home/Newsletter.module.scss";
import clsx from "clsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { message } from "antd";
import siteService from "../../../../services/siteService";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    recipientEmail: "",
  };

  const validationSchema = Yup.object().shape({
    recipientEmail: Yup.string().email("Invalid email"),
  });

  const handleNewsletterSubmit = async (values) => {
    try {
      setLoading(true);
      const result = await siteService.sendSubscribeMail(values);
      message.success(result?.data?.data || "Email sent successfully");
    } catch (error) {
      message.error(error?.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={clsx(styles.wrapper, "my-5 py-5")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-8 offset-xl-3 offset-lg-2 text-center py-4 py-md-5">
            <h2 className={clsx(styles.title, "h1")}>
              Deliciousness to your inbox
            </h2>
            <p
              className={clsx(
                styles.description,
                "f-size-24 font-weight-regular"
              )}
            >
              Enjoy weekly hand picked recipes <br></br> and recommendations
            </p>
            <div className={clsx(styles.inputContainer, "input-group mt-4")}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleNewsletterSubmit}
              >
                {({ errors, touched }) => {
                  return (
                    <Form>
                      <Field
                        id="recipientEmail"
                        name="recipientEmail"
                        type="email"
                        placeholder="Email Address"
                        spellCheck={false}
                      />
                      <div className={styles.btnContainer}>
                        <button type="submit" className="btn btn-primary">
                          {loading ? "JOINING..." : "JOIN"}
                        </button>
                      </div>
                      <ErrorMessage name="recipientEmail">
                        {(msg) => <div className={styles.error}>{msg}</div>}
                      </ErrorMessage>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <small className="mt-3 d-block">
              By joining our newsletter you agree to our{" "}
              <a href="#" className="text-black d-block d-sm-inline-block">
                <u className={styles.underline}>Terms and Conditions</u>
              </a>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
