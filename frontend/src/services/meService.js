import axiosInstance from "./axiosInstance";
import { MeApi } from "../constants/apis";

const meService = {
  uploadAvatar: async (formData) =>
    await axiosInstance.post(MeApi.UPLOAD_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteAvatar: async () => {
    await axiosInstance.delete(MeApi.DELETE_AVATAR);
  },
  updateProfile: async (values) => {
    await axiosInstance.put(MeApi.UPDATE_PROFILE, values);
  },
  deleteAccount: async () => {
    await axiosInstance.delete(MeApi.DELETE_ACCOUNT);
  },
};

export default meService;
