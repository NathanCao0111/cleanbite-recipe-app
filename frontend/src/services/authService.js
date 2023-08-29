import axiosInstance from "./axiosInstance";
import { UserApi, MeApi } from "../constants/apis";

const authService = {
  login: async (values) =>
    await axiosInstance.post(UserApi.CREATE_LOGIN, values),
  register: async (values) =>
    await axiosInstance.post(UserApi.CREATE_REGISTER, values),
  getMe: async () => await axiosInstance.get(MeApi.GET_ME),
};

export default authService;
