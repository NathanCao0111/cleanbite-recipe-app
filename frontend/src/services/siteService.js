import axiosInstance from "./axiosInstance";
import { SiteApi } from "../constants/apis";

const siteService = {
  all: async (values) => await axiosInstance.get(`/all?limit=${values}`),
  single: async (values) => await axiosInstance.get(`/single/${values}`),
  likes: async () => await axiosInstance.get(SiteApi.GET_MOST_LIKES_RECIPES),
  categoriesCount: async () =>
    await axiosInstance.get(SiteApi.GET_CATEGORIES_COUNT),
  sendSubscribeMail: async (values) =>
    await axiosInstance.post(SiteApi.SEND_SUBSCRIBE_MAIL, values),
};

export default siteService;
