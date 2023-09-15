import { useState, useContext, useEffect } from "react";
import styles from "../../scss/pages/CreatedRecipe/CreatedRecipe.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Result, Spin, Pagination } from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";

function CreatedRecipe() {
  const {
    createdRecipes,
    fetchCreatedRecipes,
    recipesLoading,
    setRecipesLoading,
  } = useContext(RecipesContext);
  const [current, setCurrent] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlePaginationChange = async (page) => {
    try {
      setCurrent(page);
      setRecipesLoading(true);
      await fetchCreatedRecipes(selectedOption, page);
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOption === "asc") {
      fetchCreatedRecipes("asc");
    }

    if (selectedOption === "desc") {
      fetchCreatedRecipes("desc");
    }
  }, [selectedOption]);

  return (
    <section className={clsx(styles.wrapper, "mb-4 mb-md-5")}>
      <div
        className={clsx(styles.header, "row align-items-end mb-0 mb-md-4 pt-0")}
      >
        <div className={clsx(styles.title, "col-lg-9 col-md-8")}>
          <h5 className="py-3 mb-0">
            Created Recipes&nbsp;
            <sup>
              ({createdRecipes?.pagination.totalDocuments || 0}{" "}
              {createdRecipes?.pagination.totalDocuments > 1
                ? "Recipes"
                : "Recipe"}
              )
            </sup>
          </h5>
          <p>
            "One thing I learned living in the Canarsie section of Brooklyn, NY
            was how to cook a good Italian meal!" - Tricia Albert
          </p>
        </div>
        <div className={clsx(styles.sort, "col-lg-3 col-md-4")}>
          <div className={styles.filter}>
            <select
              className="form-control"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Date Created
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      {createdRecipes?.data.length ? (
        recipesLoading ? (
          <div className={styles.spinContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="row">
              {createdRecipes?.data?.map((element) => {
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
                total={createdRecipes?.pagination.totalDocuments}
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
            subTitle="You haven't created any recipe yet."
          />
        </>
      )}
    </section>
  );
}

export default CreatedRecipe;
