import axiosInstance from "./axiosInstance";

const authAPI = {
  login: (values) => axiosInstance.post("/users/auth/login", values),
  register: (values) => axiosInstance.post("/users/auth/register", values),
  authInfo: () => axiosInstance.get("/me"),
};

export default authAPI;
