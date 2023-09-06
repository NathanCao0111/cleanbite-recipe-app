import { useContext } from "react";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Feature from "../../components/pages/Home/Feature";
import Trending from "../../components/pages/Home/Trending";

function Home() {
  const { siteRecipes, siteRecipe } = useContext(SiteContext);

  return (
    <main>
      <Feature recipes={siteRecipes} recipe={siteRecipe} />
      <Trending recipes={siteRecipes} recipe={siteRecipe} />
    </main>
  );
}

export default Home;
