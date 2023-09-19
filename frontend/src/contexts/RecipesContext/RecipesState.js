import { message } from "antd";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import SiteContext from "../SiteContext/SiteContext";
import RecipesContext from "./RecipesContext";
import recipesService from "../../services/recipesService";
import { useNavigate } from "react-router-dom";

const RecipesState = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { fetchSiteAllRecipes } = useContext(SiteContext);
  const [recipes, setRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [recipe, setRecipe] = useState({});
  const [searchRecipes, setSearchRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [createdRecipes, setCreatedRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [archivedRecipes, setArchivedRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [archivedRecipe, setArchivedRecipe] = useState({});
  const [recipesLoading, setRecipesLoading] = useState(false);

  const fetchAllRecipes = async () => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.all();
      const data = result?.data?.data;
      setRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting all recipes"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchSingleRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.single(values);
      const data = result?.data?.data;
      setRecipe(data);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting the recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchCreatedRecipes = async (archived, page) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.created(archived, page);
      const data = result?.data?.data;
      setCreatedRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting created recipes"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchSearchRecipes = async (title, page) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.search(title, page);
      const data = result?.data?.data;
      setSearchRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      setSearchRecipes({
        pagination: {},
        data: [],
      });
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchFavoriteRecipes = async (mostLiked, page) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.favorites(mostLiked, page);
      const data = result?.data?.data;
      setFavoriteRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting favorite recipes"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchUpdateFavoritesRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.updateFavorites(values);
      const data = result?.data?.data;
      setRecipe(data);
      message.success("Dislike recipe successfully");
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error updating recipe like"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchCreateRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.create(values);
      await fetchCreatedRecipes();
      await fetchAllRecipes();
      await fetchSiteAllRecipes();
      message.success("Create recipe successfully");
      navigate(`/recipes/single/${result?.data?.data?._id}`);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error create the recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchUpdateRecipe = async (id, values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.update(id, values);
      await fetchSingleRecipe(id);
      await fetchCreatedRecipes();
      await fetchAllRecipes();
      await fetchSiteAllRecipes();
      message.success("Update recipe successfully");
      navigate(`/recipes/single/${result?.data?.data?._id}`);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error updating the recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchArchivedRecipes = async (deletedAt, page) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.archived(deletedAt, page);
      const data = result?.data?.data;
      setArchivedRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting archived recipes"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchArchivedRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.archivedSingle(values);
      const data = result?.data?.data;
      setArchivedRecipe(data);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error getting the archived recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchDeleteRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      await recipesService.delete(values);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error archiving the recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchRestoreRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      await recipesService.restore(values);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error restoring the recipe"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  const fetchDestroyRecipe = async (values) => {
    try {
      setRecipesLoading(true);
      await recipesService.destroy(values);
      message.success("Delete recipe successfully");
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Error deleting the recipe permanently"
      );
    } finally {
      setRecipesLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchAllRecipes();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchCreatedRecipes();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchFavoriteRecipes();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchArchivedRecipes();
    }
  }, [auth]);

  useEffect(() => {
    if (recipes.data.length) {
      setSearchRecipes(recipes);
    }
  }, [recipes]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        recipe,
        searchRecipes,
        createdRecipes,
        favoriteRecipes,
        archivedRecipes,
        archivedRecipe,
        recipesLoading,
        setRecipe,
        setRecipesLoading,
        fetchAllRecipes,
        fetchSingleRecipe,
        fetchCreatedRecipes,
        fetchSearchRecipes,
        fetchFavoriteRecipes,
        fetchUpdateFavoritesRecipe,
        fetchCreateRecipe,
        fetchUpdateRecipe,
        fetchArchivedRecipes,
        fetchArchivedRecipe,
        fetchDeleteRecipe,
        fetchRestoreRecipe,
        fetchDestroyRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
