import { useState, useEffect, useContext } from "react";
import styles from "../../scss/pages/Profile.module.scss";
import clsx from "clsx";
import meService from "../../services/meService";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import Notification from "../../utils/Notification";
import { NotificationType } from "../../constants/NotificationType";
import AntdButton from "../../utils/Button";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faLock,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "antd";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState(null);
  const [pwDisabled, setPwDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth, fetchCurrentUser } = useContext(AuthContext);

  const initialValues = {
    fullname: auth.user.fullname,
    username: auth.user.username,
    email: auth.user.email,
    password: auth.user.password,
  };

  const ProfileSchema = Yup.object().shape({
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

  const handleProfileSubmit = async (values) => {
    try {
      setLoadingSave(true);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleChangePwBtn = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", selectedFile); //formData.append(name, value)

      // call API upload file
      await meService.uploadAvatar(formData);

      // fetch current user to render
      await fetchCurrentUser();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setLoadingDelete(true);

      await meService.deleteAvatar();

      await fetchCurrentUser();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  return (
    <section className={styles.wrapper}>
      {error && Notification(error, NotificationType.error)}
      <header className="row align-items-center pt-0">
        <h3 className={clsx(styles.heading, "py-2 py-md-3 mb-0")}>Profile</h3>
      </header>
      <hr></hr>
      <div className="d-flex flex-wrap pt-3 pt-md-5 pb-4 mb-2 align-items-center">
        <div className={styles.avatarImg}>
          <img
            src={
              auth.user.avatar ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
          />
        </div>
        <div className={styles.avatarBtns}>
          <Button color="primary">
            <label htmlFor="changeAvatar">
              {loading ? "Loading..." : "Change avatar"}
            </label>
            <input
              type="file"
              id="changeAvatar"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          <Button color="outline-dark" onClick={handleDeleteAvatar}>
            {loadingDelete ? "Loading..." : "Delete"}
          </Button>
        </div>
      </div>
      <div className="row">
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleProfileSubmit}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <div className="col-lg-8 mt-4">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <div className={styles.inputWrapper}>
                        <label htmlFor="fullname">Full name</label>
                        <div className={styles.inputContainer}>
                          <Field
                            type="text"
                            id="fullname"
                            name="fullname"
                            spellCheck={false}
                          />
                          <span>
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                        </div>
                        <ErrorMessage name="fullname">
                          {(msg) => <div className={styles.error}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className={styles.inputWrapper}>
                        <label htmlFor="username">Username</label>
                        <div className={styles.inputContainer}>
                          <Field
                            type="text"
                            id="username"
                            name="username"
                            spellCheck={false}
                          />
                          <span>
                            <FontAwesomeIcon icon={faAt} />
                          </span>
                        </div>
                        <ErrorMessage name="username">
                          {(msg) => <div className={styles.error}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <div className={styles.inputContainer}>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            spellCheck={false}
                          />
                          <span>
                            <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                        </div>
                        <ErrorMessage name="email">
                          {(msg) => <div className={styles.error}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className={styles.inputWrapper}>
                        <label>Password</label>
                        <div className={styles.inputContainer}>
                          <Field
                            type="password"
                            name="password"
                            spellCheck={false}
                            disabled={pwDisabled}
                          />
                          <span>
                            <FontAwesomeIcon icon={faLock} />
                          </span>
                        </div>
                        <button
                          className={clsx(styles.changePw, "resetBtn")}
                          onClick={handleChangePwBtn}
                        >
                          Change
                        </button>
                        <Modal
                          title="Password Confirmation"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                        </Modal>
                        <ErrorMessage name="password">
                          {(msg) => <div className={styles.error}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 mb-5">
                    <AntdButton
                      description={loadingSave ? "Loading..." : "Save"}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <hr></hr>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 mb-md-5">
        <button className={clsx(styles.logoutBtn, "resetBtn")}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span>Log out</span>
        </button>
        <button className={clsx(styles.deleteAccBtn, "resetBtn")}>
          Delete account
        </button>
      </div>
    </section>
  );
};

export default Profile;
