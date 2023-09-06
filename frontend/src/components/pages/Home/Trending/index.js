import styles from "../../../../scss/pages/Home/Trending.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Trending = (props) => {
  const { recipes } = props;

  return (
    <section className={clsx(styles.wrapper, "my-4 my-md-5")}>
      <h4 className={clsx(styles.title, "py-3 mb-0")}>Trending now</h4>
      <div className="row">
        {recipes?.data
          ?.sort((a, b) => b.likes - a.likes)
          ?.slice(0, 3)
          ?.map((element) => {
            return (
              <div className="col-md-4">
                <figure className={clsx(styles.figure, "my-3")}>
                  <Link
                    to={`/recipes/${element._id}`}
                    className={clsx(styles.figLink, "rounded-6")}
                  >
                    <img src={element.image} alt={element.title} />
                  </Link>
                  <figcaption className="mt-2">
                    <div className="w-100 float-left">
                      <div className="float-left">
                        <strong className={styles.likeContainer}>
                          <FontAwesomeIcon icon={faHeart} />
                          <span>{element.likes}</span>
                        </strong>
                      </div>
                    </div>
                    <Link
                      to={`/recipes/${element._id}`}
                      className={clsx(
                        styles.figTitle,
                        "f-size-20 text-black d-block mt-1 font-weight-semibold"
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

export default Trending;
