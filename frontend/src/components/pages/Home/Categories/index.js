import styles from "../../../../scss/pages/Home/Categories.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { categories } from "../../../../constants/Categories";

const Categories = (props) => {
  const { siteCategoriesCount } = props;
  const topSixCategories = siteCategoriesCount.slice(0, 6);

  const sixRenderCategories = categories?.filter((element) => {
    for (let i = 0; i < topSixCategories.length; i++) {
      if (element.type === topSixCategories[i].categories) return element;
    }
  });

  return (
    <section className={clsx(styles.wrapper, "my-4 my-md-5")}>
      <h4 className={clsx(styles.title, "py-3 mb-0")}>Popular Categories</h4>
      <div className="row">
        {sixRenderCategories?.map((element) => {
          return (
            <div className="col-lg-2 col-md-4 col-4" key={element.id}>
              <figure className={clsx(styles.figure, "my-3 text-center")}>
                <Link
                  to={`/recipes/categories/${element.id}`}
                  className={clsx(styles.figLink, "rounded-circle")}
                >
                  <img src={element.img} alt={element.type} />
                </Link>
                <figcaption className="mt-2">
                  <Link
                    to={`/recipes/categories/${element.id}`}
                    className={clsx(
                      styles.figTitle,
                      "f-size-20 d-block font-weight-semibold"
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
