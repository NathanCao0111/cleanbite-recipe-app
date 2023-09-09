import { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../../scss/pages/Recipes/Recipes.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import debounce from "lodash.debounce";
import recipesService from "../../services/recipesService";

function Recipes() {
  const { recipes } = useContext(RecipesContext);
  const [loading, setLoading] = useState(false);
  const [renderRecipes, setRenderRecipes] = useState(recipes);
  const [searchValue, setSearchValue] = useState("");

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  const handleDebounceFn = async (values) => {
    try {
      setLoading(true);
      const result = await recipesService.search(values);
      console.log(result);
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Error searching recipes"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    debounceFn(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

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
        <span className="mt-2 mr-1">(13 Recipes)</span>
        <button type="button" onClick={handleClearSearch}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="row">
        {renderRecipes?.data?.map((element) => {
          return (
            <div className="col-lg-3 col-md-4 col-6" key={element._id}>
              <figure className={clsx(styles.figure, "my-3 my-md-4")}>
                <Link
                  to={`/recipes/${element._id}`}
                  className={clsx(styles.figLink, "stretched-link rounded-6")}
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
        <button className="btn btn-outline-dark px-4 px-md-5 py-1 py-md-2 big font-weight-medium">
          Load More
        </button>
      </div>
    </section>
  );
}

export default Recipes;
