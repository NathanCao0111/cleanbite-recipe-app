import { useState, useContext } from "react";
import styles from "../../scss/pages/Profile.module.scss";
import clsx from "clsx";
import meService from "../../services/meService";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import Notification from "../../utils/Notification";
import { NotificationType } from "../../constants/NotificationType";
import AntdButton from "../../utils/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faLock,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    auth: { authInfo },
    fetchCurrentUser,
  } = useContext(AuthContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      console.log(formData);
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

  return (
    <section className={styles.wrapper}>
      {error && Notification(error, NotificationType.error)}
      <header className="row align-items-center pt-0">
        <h3 className={clsx(styles.heading, "py-2 py-md-3 mb-0")}>Profile</h3>
      </header>
      <hr></hr>
      <div className="d-flex flex-wrap pt-3 pt-md-5 pb-4 mb-2 align-items-center">
        <div className={styles.avatarImg}>
          <img src={authInfo?.avatar || ""} alt="avatar" />
        </div>
        <div className="d-flex">
          <AntdButton
            type="primary"
            profileBtn="primary"
            description="Change avatar"
          />
          <AntdButton
            type="default"
            profileBtn="default"
            description="Delete"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <form className="mt-4">
            <div className="row mb-2">
              <div className="col-sm-6">
                <div className={styles.inputWrapper}>
                  <label>Full name</label>
                  <div className={styles.inputContainer}>
                    <input type="text" value="abc" spellCheck={false} />
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className={styles.inputWrapper}>
                  <label>Username</label>
                  <div className={styles.inputContainer}>
                    <input type="text" value="abc" spellCheck={false} />
                    <span>
                      <FontAwesomeIcon icon={faAt} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className={styles.inputWrapper}>
                  <label>Email</label>
                  <div className={styles.inputContainer}>
                    <input type="email" value="abc" spellCheck={false} />
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className={styles.inputWrapper}>
                  <label>Password</label>
                  <div className={styles.inputContainer}>
                    <input type="password" value="abc" spellCheck={false} />
                    <span>
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 mb-5">
              <AntdButton
                type="primary"
                profileBtn="profile"
                description="Save"
              />
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-4 mb-md-5">
        <button className={clsx(styles.logoutBtn, "resetBtn")}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span>Log out</span>
        </button>
        <button className={clsx(styles.deleteAccBtn, "resetBtn")}>Delete account</button>
      </div>

      {/* {loading && <p>Avatar is uploading...</p>}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleFileUpload}>Upload avatar</button> */}
    </section>
  );
};

export default Profile;
