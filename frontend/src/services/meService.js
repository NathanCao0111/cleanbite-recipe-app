import axiosInstance from "./axiosInstance";
import { MeApi } from "../constants/apis";

const meService = {
  uploadAvatar: (formData) =>
    axiosInstance.post(MeApi.UPLOAD_AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteAvatar: () => {
    axiosInstance.delete(MeApi.DELETE_AVATAR);
  },
};

export default meService;
