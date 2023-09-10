import { useContext } from "react";
import { Spin } from "antd";
import styles from "../../scss/pages/Home/Home.module.scss";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Feature from "../../components/pages/Home/Feature";
import Trending from "../../components/pages/Home/Trending";
import LatestRecipes from "../../components/pages/Home/LatestRecipes";
import Categories from "../../components/pages/Home/Categories";
import Newsletter from "../../components/pages/Home/Newsletter";

function Home() {
  const {
    siteRecipes,
    siteRecipe,
    siteMostLikesRecipes,
    siteCategoriesCount,
    siteLoading,
  } = useContext(SiteContext);

  return (
    <main>
      {siteLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Feature recipe={siteRecipe} />
          <Trending siteMostLikesRecipes={siteMostLikesRecipes} />
          <Categories siteCategoriesCount={siteCategoriesCount} />
          <Newsletter />
          <LatestRecipes recipes={siteRecipes} />
        </>
      )}
    </main>
  );
}

export default Home;
