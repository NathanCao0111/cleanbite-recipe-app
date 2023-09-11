import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "../../scss/pages/SingleRecipe/SingleRecipe.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faCalendar } from "@fortawesome/free-regular-svg-icons";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import { Spin } from "antd";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import dayjs from "dayjs";

function SingleRecipe() {
  const recipeId = useParams();
  const { recipe, recipesLoading, fetchSingleRecipe } =
    useContext(RecipesContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchSingleRecipe(recipeId.id);
  }, []);

  console.log(recipe);

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
                  {recipe.likes} chefs would make this again
                </span>
              </strong>
              <h5 className="py-3 mb-0 h2">{recipe.title}</h5>
            </div>
            <div className="order-sm-2 ml-auto">
              <div className="d-flex pt-0 align-items-center">
                <button className="resetBtn">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
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
                  auth.user.avatar ||
                  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
                className="rounded-circle"
              />
              <small className="pl-1">{auth.user.username}</small>
            </div>
            <div className={clsx(styles.date, "my-2 me-4")}>
              <FontAwesomeIcon icon={faCalendar} />
              <small>{dayjs(recipe.createdAt).format("YYYY-MM-DD")}</small>
            </div>
            <div className={clsx(styles.likes, "my-2 me-4")}>
              <FontAwesomeIcon icon={faHeart} />
              <small>{recipe.likes}</small>
            </div>
          </div>
          <div className={styles.content}>
            <hr></hr>
            <p>{recipe.description}</p>
            <br></br>
            <div className="rounded-12 overflow-hidden position-relative">
              <img src={recipe.image} alt={recipe.title} className="w-100" />
            </div>
            <br></br>
            <div className="row mt-0 mt-md-5">
              <div className="col-md-12">
                <ul className="list-unstyled component-list">
                  <li>
                    <small>PREP TIME</small>
                    <span>{recipe?.time?.preparation}</span>
                  </li>
                  <li>
                    <small>COOK TIME</small>
                    <span>{recipe?.time?.cooking}</span>
                  </li>
                  <li>
                    <small>SERVINGS</small>
                    <span>{recipe.serves}</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default SingleRecipe;
