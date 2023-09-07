import styles from "../../../../scss/pages/Home/Categories.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { categories } from "../../../../constants/Categories";

const Categories = (props) => {
  return (
    <section className={clsx(styles.wrapper, "my-4 my-md-5")}>
      <h4 className={clsx(styles.title, "py-3 mb-0")}>Popular Categories</h4>
      <div className="row">
        {categories?.map((element, index) => {
          return (
            <div className="col-lg-2 col-md-4 col-4" key={index}>
              <figure className={clsx(styles.figure, "my-3 my-md-4")}>
                <Link
                  to={`/recipes/${element._id}`}
                  className={clsx(styles.figLink, "rounded-6")}
                >
                  <img src={element.img} alt={element.title} />
                </Link>
                <figcaption className="mt-2">
                  <div className="w-100 float-left">
                    <div className="float-left">
                      <strong className={styles.likeContainer}>
                        <span>{element.likes}</span>
                      </strong>
                    </div>
                  </div>
                  <Link
                    to={`/recipes/${element._id}`}
                    className={clsx(
                      styles.figTitle,
                      "f-size-20 d-block mt-1 font-weight-semibold"
                    )}
                  >
                    {element.type}
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

export default Categories;
