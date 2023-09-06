import { useContext } from "react";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Feature from "../../components/pages/Home/Feature";

function Home() {
  const { siteRecipes, siteRecipe } = useContext(SiteContext);

  return <Feature recipes={siteRecipes} recipe={siteRecipe} />;
}

export default Home;
