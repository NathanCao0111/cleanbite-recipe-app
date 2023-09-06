import { useContext } from "react";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import Feature from "../../components/pages/Home/Feature";

function Home() {
  const { recipes, recipe } = useContext(RecipesContext);

  return <Feature recipes={recipes} recipe={recipe} />;
}

export default Home;
