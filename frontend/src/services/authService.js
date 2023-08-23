import axiosInstance from "./axiosInstance";
import { UserApi, MeApi } from "../constants/apis";

const authService = {
  login: (values) => axiosInstance.post(UserApi.CREATE_LOGIN, values),
  register: (values) => axiosInstance.post(UserApi.CREATE_REGISTER, values),
  getMe: () => axiosInstance.get(MeApi.GET_ME),
};

export default authService;
