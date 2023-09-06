import { message } from "antd";
import { useEffect, useState } from "react";
import RecipesContext from "./RecipesContext";
import recipesService from "../../services/recipesService";

const RecipesState = ({ children }) => {
  const [recipes, setRecipes] = useState({
    pagination: {},
    data: [],
  });
  const [recipe, setRecipe] = useState({});

  const fetchAllRecipes = async () => {
    try {
      const result = await recipesService.all();
      const data = result?.data?.data;
      setRecipes({
        pagination: data?.pagination,
        data: data?.data,
      });
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    }
  };

  const fetchSingleRecipe = async (values) => {
    try {
      const result = await recipesService.single(values);
      const data = result?.data?.data;
      setRecipe(data);
    } catch (error) {
      message.error(error?.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (recipes.data.length !== 0) {
      const randomRecipe = recipes?.data[Math.floor(Math.random() * 10)];
      fetchSingleRecipe(randomRecipe._id);
    }
  }, [recipes]);

  return (
    <RecipesContext.Provider
      value={{ recipes, recipe, fetchAllRecipes, fetchSingleRecipe }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
