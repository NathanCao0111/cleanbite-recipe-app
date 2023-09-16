import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../../scss/pages/SingleRecipe/SingleRecipe.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendar } from "@fortawesome/free-regular-svg-icons";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import { Spin, Dropdown, Space } from "antd";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import dayjs from "dayjs";
import Trending from "../../components/pages/Home/Trending";
import SiteContext from "../../contexts/SiteContext/SiteContext";

function SingleRecipe() {
  const recipeId = useParams();
  const {
    recipe,
    recipesLoading,
    fetchAllRecipes,
    fetchSingleRecipe,
    fetchFavoriteRecipes,
    fetchUpdateFavoritesRecipe,
    fetchDeleteRecipe,
  } = useContext(RecipesContext);
  const { siteMostLikesRecipes, fetchSiteAllRecipes } = useContext(SiteContext);
  const { auth } = useContext(AuthContext);
  const [nutritionKeysArr, setNutritionKeysArr] = useState([]);

  const handleDeleteItem = async () => {
    await fetchDeleteRecipe(recipeId.id);
    await fetchSingleRecipe(recipeId.id);
  };

  const items = [
    {
      label: (
        <Link
          to={`/recipes/update/${recipeId.id}`}
          style={{ textDecoration: "none", fontSize: 16 }}
        >
          Update
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <button
          className="resetBtn"
          style={{ fontSize: 16 }}
          onClick={handleDeleteItem}
        >
          Archive
        </button>
      ),
      key: "1",
    },
  ];

  const handleLikeBtn = async () => {
    await fetchUpdateFavoritesRecipe(recipeId.id);
    await fetchFavoriteRecipes();
    await fetchAllRecipes();
    await fetchSiteAllRecipes();
  };

  useEffect(() => {
    fetchSingleRecipe(recipeId.id);
  }, []);

  useEffect(() => {
    if (recipe?.nutrition) {
      setNutritionKeysArr(Object.keys(recipe?.nutrition));
    }
  }, [recipe]);

  return (
    <section className={styles.wrapper}>
      {recipesLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            className={clsx(styles.title, "d-sm-flex justify-content-between")}
          >
            <div>
              <strong>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <span className="ml-2 caption font-weight-medium">
                  {recipe?.likes
                    ? `${recipe?.likes} chefs would make this again`
                    : "Be the first chef to like this recipe!"}
                </span>
              </strong>
              <h5 className="py-3 mb-0 h2">{recipe?.title}</h5>
            </div>
            <div className="order-sm-2 ml-auto">
              <div className="d-flex pt-0 align-items-center">
                <button
                  className={clsx(styles.likeBtn, "resetBtn")}
                  onClick={handleLikeBtn}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                  arrow={{ pointAtCenter: true }}
                >
                  <Link onClick={(e) => e.preventDefault()}>
                    <Space>
                      <button className={clsx(styles.hoverMe, "resetBtn")}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                    </Space>
                  </Link>
                </Dropdown>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              styles.description,
              "d-flex flex-wrap align-items-center"
            )}
          >
            <div className={clsx(styles.author, "my-2 me-4")}>
              <img
                src={
                  auth?.user?.avatar ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
                className="rounded-circle"
              />
              <small className="pl-1">{auth?.user?.username}</small>
            </div>
            <div className={clsx(styles.date, "my-2 me-4")}>
              <FontAwesomeIcon icon={faCalendar} />
              <small>{dayjs(recipe?.createdAt).format("YYYY-MM-DD")}</small>
            </div>
            <div className={clsx(styles.likes, "my-2 me-4")}>
              <FontAwesomeIcon icon={faHeart} />
              <small>{recipe?.likes}</small>
            </div>
          </div>
          <div className={styles.content}>
            <hr></hr>
            <p>{recipe?.description}</p>
            <br></br>
            <div className="rounded-12 overflow-hidden position-relative">
              <img src={recipe?.image} alt={recipe?.title} className="w-100" />
            </div>
            <br></br>
            <div className="row mt-0 mt-md-5">
              <div className="col-md-12">
                <ul className={clsx(styles.instructions, "list-unstyled")}>
                  <li>
                    <small>Prep Time</small>
                    <span>{recipe?.time?.preparation}</span>
                  </li>
                  <li>
                    <small>Cook Time</small>
                    <span>{recipe?.time?.cooking}</span>
                  </li>
                  <li>
                    <small>Servings</small>
                    <span>{recipe?.serves}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="mt-4 mt-md-5">
                  <h6>Ingredients</h6>
                  <div className={clsx(styles.ingredients, "pb-4")}>
                    {recipe?.ingredients?.map((element, index) => {
                      return (
                        <div
                          className={clsx(styles.inputContainer, "form-check")}
                          key={index}
                        >
                          <input
                            type="checkbox"
                            id={element}
                            name={element}
                            className="form-check-input"
                          />
                          <label htmlFor={element}>{element}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={clsx(styles.nutrition, "row mt-4 g-0")}>
                  <div className="col-lg-8">
                    <div className={clsx(styles.container, "p-4")}>
                      <h6>Nutrition Facts</h6>
                      <ul>
                        {nutritionKeysArr?.map((element, index) => {
                          return (
                            <li key={index}>
                              <span className={styles.nutritionKey}>
                                {element}
                              </span>
                              <span className={styles.nutritionValue}>
                                {recipe?.nutrition[element]}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mt-5">
                  <h6>Methods</h6>
                  <ul className={clsx(styles.methods, "list-unstyled")}>
                    {recipe?.method?.map((element, index) => {
                      return (
                        <li key={index}>
                          <span>{index + 1}</span>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Trending siteMostLikesRecipes={siteMostLikesRecipes} />
    </section>
  );
}

export default SingleRecipe;
