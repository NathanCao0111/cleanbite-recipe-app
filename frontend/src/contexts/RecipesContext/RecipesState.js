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
    if (auth.isAuthenticated) {
      fetchAllRecipes();
    }
  }, [auth]);

  return (
    <RecipesContext.Provider
      value={{ recipes, recipe, fetchAllRecipes, fetchSingleRecipe }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
