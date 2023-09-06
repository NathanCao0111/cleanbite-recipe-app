import axiosInstance from "./axiosInstance";
import { SiteApi } from "../constants/apis";

const siteService = {
  all: async () => await axiosInstance.get(SiteApi.GET_ALL_RECIPES),
  single: async (values) => await axiosInstance.get(`/${values}`),
};

export default siteService;
