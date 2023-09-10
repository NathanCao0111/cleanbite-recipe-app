import { message } from "antd";
import { useEffect, useState } from "react";
import SiteContext from "./SiteContext";
import siteService from "../../services/siteService";

const SiteState = ({ children }) => {
  const [siteRecipes, setSiteRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [siteRecipe, setSiteRecipe] = useState({});
  const [siteMostLikesRecipes, setSiteMostLikesRecipes] = useState([]);
  const [siteCategoriesCount, setSiteCategoriesCount] = useState([]);
  const [siteLoading, setSiteLoading] = useState(false);

  const fetchSiteAllRecipes = async (values) => {
    try {
      setSiteLoading(true);
      const result = await siteService.all(values);
      const data = result?.data?.data;
      setSiteRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    } finally {
      setSiteLoading(false);
    }
  };

  const fetchSiteSingleRecipe = async (values) => {
    try {
      setSiteLoading(true);
      const result = await siteService.single(values);
      const data = result?.data?.data;
      setSiteRecipe(data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    } finally {
      setSiteLoading(false);
    }
  };

  const fetchSiteMostLikesRecipes = async () => {
    try {
      setSiteLoading(true);
      const result = await siteService.likes();
      const data = result?.data?.data?.data;
      setSiteMostLikesRecipes(data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    } finally {
      setSiteLoading(false);
    }
  };

  const fetchSiteCategoriesCount = async () => {
    try {
      setSiteLoading(true);
      const result = await siteService.categoriesCount();
      const data = result?.data?.data;
      setSiteCategoriesCount(data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    } finally {
      setSiteLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteAllRecipes(12);
  }, []);

  useEffect(() => {
    if (siteRecipes.data.length !== 0) {
      const randomRecipe = siteRecipes?.data[Math.floor(Math.random() * 10)];
      fetchSiteSingleRecipe(randomRecipe._id);
    }
  }, [siteRecipes.data.length]);

  useEffect(() => {
    fetchSiteMostLikesRecipes();
  }, []);

  useEffect(() => {
    fetchSiteCategoriesCount();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        siteRecipes,
        siteRecipe,
        siteMostLikesRecipes,
        siteCategoriesCount,
        siteLoading,
        fetchSiteAllRecipes,
        fetchSiteSingleRecipe,
        setSiteMostLikesRecipes,
        fetchSiteCategoriesCount,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteState;
