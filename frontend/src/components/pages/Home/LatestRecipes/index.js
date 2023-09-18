import styles from "../../../../scss/pages/Home/LatestRecipes.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LatestRecipes = (props) => {
  const { recipes } = props;

  return (
    <section className={clsx(styles.wrapper, "my-4 my-md-5")}>
      <h4 className={clsx(styles.title, "py-3 mb-0")}>Latest Recipes</h4>
      <div className="row">
        {recipes?.data?.map((element) => {
          return (
            <div className="col-lg-3 col-md-4 col-6" key={element._id}>
              <figure className={clsx(styles.figure, "my-3 my-md-4")}>
                <Link
                  to={`/recipes/single/${element._id}`}
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
                    to={`/recipes/single/${element._id}`}
                    className={clsx(
                      styles.figTitle,
                      "f-size-20 d-block mt-1 font-weight-semibold"
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
    </section>
  );
};

export default LatestRecipes;
