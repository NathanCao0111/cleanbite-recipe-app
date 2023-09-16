import { useState, useContext, useEffect } from "react";
import styles from "../../scss/pages/Archived/Archived.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Result, Spin, Pagination } from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import SiteContext from "../../contexts/SiteContext/SiteContext";

const Archived = () => {
  const {
    archivedRecipes,
    fetchAllRecipes,
    fetchFavoriteRecipes,
    fetchUpdateFavoritesRecipe,
    recipesLoading,
    setRecipesLoading,
  } = useContext(RecipesContext);
  const { fetchSiteAllRecipes } = useContext(SiteContext);
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

  const handleDislikeItem = async (element) => {
    await fetchUpdateFavoritesRecipe(element._id);
    await fetchFavoriteRecipes(mostLiked);
    await fetchAllRecipes();
    await fetchSiteAllRecipes();
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
            Archived Recipes&nbsp;
            <sup>
              ({archivedRecipes?.pagination.totalDocuments || 0}{" "}
              {archivedRecipes?.pagination.totalDocuments > 1
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
                Archived Date
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      <p className={styles.description}>
        <span>* </span>Click on item to dislike
      </p>
      {archivedRecipes?.data.length ? (
        recipesLoading ? (
          <div className={styles.spinContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="row">
              {archivedRecipes?.data?.map((element) => {
                return (
                  <div className="col-lg-3 col-md-4 col-6" key={element._id}>
                    <figure
                      className={clsx(styles.figure, "my-3 my-md-4")}
                      onClick={() => handleDislikeItem(element)}
                    >
                      <Link
                        to=""
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
                          to=""
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
                total={archivedRecipes?.pagination.totalDocuments}
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

export default Archived;
