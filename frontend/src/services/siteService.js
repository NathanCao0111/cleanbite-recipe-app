import axiosInstance from "./axiosInstance";
import { SiteApi } from "../constants/apis";

const siteService = {
  all: async (values) => await axiosInstance.get(`/all?limit=${values}`),
  single: async (values) => await axiosInstance.get(`/${values}`),
  likes: async () => await axiosInstance.get(SiteApi.GET_MOST_LIKES_RECIPES),
};

export default siteService;
