import styles from "../../../../scss/pages/Home/Feature.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Feature = (props) => {
  const { recipe } = props;

  return (
    <section
      className={clsx(
        styles.wrapper,
        "card rounded-16 overflow-hidden border-0 mt-0 mt-md-4"
      )}
    >
      <div className="row g-0">
        <div className="col-lg-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className={styles.featureImg}
          />
        </div>
        <div className="col-lg-6">
          <div className="p-4 p-md-5 d-flex flex-column justify-content-center h-100 position-relative">
            <strong>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              <span>
                {recipe?.likes
                  ? `${recipe?.likes} chefs would make this again`
                  : "Be the first chef to like this recipe!"}
              </span>
            </strong>
            <h3 className={styles.title}>{recipe.title}</h3>
            <p
              className={clsx(
                styles.description,
                "pr-0 pr-md-5 pb-3 pb-sm-5 pb-lg-0"
              )}
            >
              {recipe.description}
            </p>
            <Link
              to={`/recipes/${recipe._id}`}
              className={clsx(styles.arrowContainer, styles.circle)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
