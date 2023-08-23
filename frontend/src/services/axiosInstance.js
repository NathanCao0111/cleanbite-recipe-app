import axios from "axios";
import { BASE_URL } from "../constants/apis";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  // get access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["x-access-token"] = accessToken;
  }

  return config;
}); //add token in req header

export default axiosInstance;
