import { useState, useContext, useEffect } from "react";
import styles from "../../scss/pages/Favorites/Favorites.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Result, Spin, Pagination } from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";

const Favorites = () => {
  const {
    favoriteRecipes,
    fetchFavoriteRecipes,
    recipesLoading,
    setRecipesLoading,
  } = useContext(RecipesContext);
  const [current, setCurrent] = useState(1);
  const [mostLiked, setMostLiked] = useState("");

  const handleSelectChange = (e) => {
    setMostLiked(e.target.value);
  };

  const handlePaginationChange = async (page) => {
    try {
      setCurrent(page);
      setRecipesLoading(true);
      await fetchFavoriteRecipes(mostLiked, page);
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  useEffect(() => {
    if (mostLiked === "asc") {
      fetchFavoriteRecipes("asc");
    }

    if (mostLiked === "desc") {
      fetchFavoriteRecipes("desc");
    }
  }, [mostLiked]);

  return (
    <section className={clsx(styles.wrapper, "mb-4 mb-md-5")}>
      <div
        className={clsx(styles.header, "row align-items-end mb-0 mb-md-4 pt-0")}
      >
        <div className={clsx(styles.title, "col-lg-9 col-md-8")}>
          <h5 className="py-3 mb-0">
            Favorite Recipes&nbsp;
            <sup>
              ({favoriteRecipes?.pagination.totalDocuments || 0}{" "}
              {favoriteRecipes?.pagination.totalDocuments > 1
                ? "Recipes"
                : "Recipe"}
              )
            </sup>
          </h5>
          <p>
            "One cannot think well, love well, sleep well, if one has not dined
            well." - Virginia Woolf, A Room of One's Own
          </p>
        </div>
        <div className={clsx(styles.sort, "col-lg-3 col-md-4")}>
          <div className={styles.filter}>
            <select
              className="form-control"
              value={mostLiked}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Most Liked
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      {favoriteRecipes?.data.length ? (
        recipesLoading ? (
          <div className={styles.spinContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="row">
              {favoriteRecipes?.data?.map((element) => {
                return (
                  <div className="col-lg-3 col-md-4 col-6" key={element._id}>
                    <figure className={clsx(styles.figure, "my-3 my-md-4")}>
                      <Link
                        to={`/recipes/${element._id}`}
                        className={clsx(
                          styles.figLink,
                          "stretched-link rounded-6"
                        )}
                      >
                        <img src={element.image} alt={element.title} />
                      </Link>
                      <figcaption className="mt-2">
                        <div className="w-100 float-left">
                          <div className="float-left">
                            <strong>
                              <FontAwesomeIcon icon={faHeart} />
                              <span>{element.likes}</span>
                            </strong>
                          </div>
                        </div>
                        <Link
                          to={`/recipes/${element._id}`}
                          className={clsx(
                            styles.figTitle,
                            "text-black d-block mt-1 font-weight-semibold big"
                          )}
                        >
                          {element.title}
                        </Link>
                      </figcaption>
                    </figure>
                  </div>
                );
              })}
            </div>
            <div className="text-center py-5">
              <Pagination
                current={current}
                onChange={handlePaginationChange}
                defaultPageSize={12}
                total={favoriteRecipes?.pagination.totalDocuments}
              />
            </div>
          </>
        )
      ) : recipesLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Result
            status="404"
            title="404"
            subTitle="You haven't liked any recipe yet."
          />
        </>
      )}
    </section>
  );
};

export default Favorites;
