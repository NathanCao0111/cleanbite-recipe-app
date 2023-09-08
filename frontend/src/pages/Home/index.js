import { useContext } from "react";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Feature from "../../components/pages/Home/Feature";
import Trending from "../../components/pages/Home/Trending";
import LatestRecipes from "../../components/pages/Home/LatestRecipes";
import Categories from "../../components/pages/Home/Categories";
import Newsletter from "../../components/pages/Home/Newsletter";

function Home() {
  const { siteRecipes, siteRecipe, siteMostLikesRecipes, siteCategoriesCount } =
    useContext(SiteContext);

  return (
    <main>
      <Feature recipe={siteRecipe} />
      <Trending siteMostLikesRecipes={siteMostLikesRecipes} />
      <Categories siteCategoriesCount={siteCategoriesCount} />
      <Newsletter />
      <LatestRecipes recipes={siteRecipes} />
    </main>
  );
}

export default Home;
