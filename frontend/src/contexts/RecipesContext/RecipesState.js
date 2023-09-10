import { message } from "antd";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import RecipesContext from "./RecipesContext";
import recipesService from "../../services/recipesService";

const RecipesState = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const [recipes, setRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [recipe, setRecipe] = useState({});
  const [searchRecipes, setSearchRecipes] = useState({
    pagination: {},
    data: [],
  });
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

  const fetchSearchRecipes = async (values) => {
    try {
      setRecipesLoading(true);
      const result = await recipesService.search(values);
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

  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchAllRecipes();
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
        recipesLoading,
        setRecipesLoading,
        fetchAllRecipes,
        fetchSingleRecipe,
        fetchSearchRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
