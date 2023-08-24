import { useState, useContext } from "react";
import meService from "../../services/meService";
import AuthContext from "../../contexts/AuthContext/AuthContext";

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
    <div>
      <h3>Profile</h3>
      {loading && <p>Avatar is uploading...</p>}
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleFileUpload}>Upload avatar</button>
      <div>
        <img
          src={authInfo?.avatar || ""}
          alt="avatar"
          style={{ width: "200px", height: "auto", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Profile;
