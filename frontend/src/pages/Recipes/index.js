import { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../../scss/pages/Recipes/Recipes.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Result, Spin, Pagination } from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import debounce from "lodash.debounce";

function Recipes() {
  const {
    searchRecipes,
    fetchSearchRecipes,
    recipesLoading,
    setRecipesLoading,
  } = useContext(RecipesContext);
  const [current, setCurrent] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    debounceFn(e.target.value);
  };

  const handleClearSearch = async () => {
    try {
      setRecipesLoading(true);
      setSearchValue("");
      await fetchSearchRecipes("");
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  const handlePaginationChange = async (page) => {
    try {
      setCurrent(page);
      setRecipesLoading(true);
      await fetchSearchRecipes(searchValue, page);
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  const handleDebounceFn = async (values) => {
    try {
      setRecipesLoading(true);
      await fetchSearchRecipes(values);
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  const debounceFn = useMemo(() => debounce(handleDebounceFn, 500), []);

  return (
    <section className={clsx(styles.wrapper, "mb-4 mb-md-5")}>
      <h5 className="py-3 mb-0">Recipes</h5>
      <div className={clsx(styles.inputContainer, "input-group")}>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Search"
          spellCheck={false}
          className="form-control bg-white"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <span className="mt-2 mr-1">
          ({searchRecipes?.pagination.totalDocuments || 0}{" "}
          {searchRecipes?.pagination.totalDocuments > 1 ? "Recipes" : "Recipe"})
        </span>
        <button type="button" onClick={handleClearSearch}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {searchRecipes?.data.length ? (
        recipesLoading ? (
          <div className={styles.spinContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="row">
              {searchRecipes?.data?.map((element) => {
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
                total={searchRecipes?.pagination.totalDocuments}
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
            subTitle="Sorry, the recipe you searched does not exist."
          />
        </>
      )}
    </section>
  );
}

export default Recipes;
