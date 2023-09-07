import { useContext } from "react";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Feature from "../../components/pages/Home/Feature";
import Trending from "../../components/pages/Home/Trending";
import LatestRecipes from "../../components/pages/Home/LatestRecipes";
import Categories from "../../components/pages/Home/Categories";

function Home() {
  const { siteRecipes, siteRecipe, siteMostLikesRecipes, siteCategoriesCount } =
    useContext(SiteContext);

  return (
    <main>
      <Feature recipe={siteRecipe} />
      <Trending siteMostLikesRecipes={siteMostLikesRecipes} />
      <LatestRecipes recipes={siteRecipes} />
      <Categories siteCategoriesCount={siteCategoriesCount} />
    </main>
  );
}

export default Home;
