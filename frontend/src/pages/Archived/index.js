import { useState, useContext, useEffect } from "react";
import styles from "../../scss/pages/Archived/Archived.module.scss";
import "../../scss/components/Button.scss";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  Result,
  Spin,
  Pagination,
  Dropdown,
  Space,
  Modal,
  message,
} from "antd";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import SiteContext from "../../contexts/SiteContext/SiteContext";
import Faqs from "../../utils/FAQs";

const Archived = () => {
  const navigate = useNavigate();
  const {
    archivedRecipes,
    fetchAllRecipes,
    fetchCreatedRecipes,
    fetchArchivedRecipes,
    fetchRestoreRecipe,
    fetchDestroyRecipe,
    recipesLoading,
    setRecipesLoading,
  } = useContext(RecipesContext);
  const { fetchSiteAllRecipes } = useContext(SiteContext);
  const [current, setCurrent] = useState(1);
  const [deletedAt, setDeletedAt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (element) => {
    try {
      setModalLoading(true);

      await fetchDestroyRecipe(element._id);
      await fetchArchivedRecipes();
      await fetchCreatedRecipes();
      await fetchAllRecipes();
      await fetchSiteAllRecipes();

      setIsModalOpen(false);
      message.success("Delete recipe successfully");
    } catch (error) {
      message.error(error?.response?.data?.message || "Error delete recipe");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRestoreBtn = async (element) => {
    await fetchRestoreRecipe(element._id);
    await fetchArchivedRecipes();
    await fetchCreatedRecipes();
    await fetchAllRecipes();
    await fetchSiteAllRecipes();

    navigate("/recipes/created");
  };

  const items = [
    {
      label: (
        <button className="resetBtn" style={{ fontSize: 16 }}>
          Restore
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button className="resetBtn" style={{ fontSize: 16 }}>
          Delete
        </button>
      ),
      key: "1",
    },
  ];

  const handleSelectChange = (e) => {
    setDeletedAt(e.target.value);
  };

  const handlePaginationChange = async (page) => {
    try {
      setCurrent(page);
      setRecipesLoading(true);
      await fetchArchivedRecipes(deletedAt, page);
    } catch (error) {
    } finally {
      setRecipesLoading(false);
    }
  };

  useEffect(() => {
    if (deletedAt === "asc") {
      fetchArchivedRecipes("asc");
    }

    if (deletedAt === "desc") {
      fetchArchivedRecipes("desc");
    }
  }, [deletedAt]);

  return (
    <section className={clsx(styles.wrapper, "mb-4 mb-md-5")}>
      <div
        className={clsx(styles.header, "row align-items-end mb-0 mb-md-4 pt-0")}
      >
        <div className={clsx(styles.title, "col-lg-9 col-md-8")}>
          <h5 className="py-3 mb-0">
            Archived Recipes&nbsp;
            <sup>
              ({archivedRecipes?.pagination.totalDocuments || 0}{" "}
              {archivedRecipes?.pagination.totalDocuments > 1
                ? "Recipes"
                : "Recipe"}
              )
            </sup>
          </h5>
          <p>
            "One cannot think well, love well, sleep well, if one has not dined
            well." - Virginia Woolf, A Room of One's Own
          </p>
        </div>
        <div className={clsx(styles.sort, "col-lg-3 col-md-4")}>
          <div className={styles.filter}>
            <select
              className="form-control"
              value={deletedAt}
              onChange={handleSelectChange}
            >
              <option value="" disabled hidden>
                Archived Date
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className={styles.description}>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className={styles.hoverMe}
          onClick={() =>
            Faqs(
              "Hover the Ellipsis on each item to restore / delete permanently"
            )
          }
        />
      </div>
      {archivedRecipes?.data.length ? (
        recipesLoading ? (
          <div className={styles.spinContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="row">
              {archivedRecipes?.data?.map((element) => {
                return (
                  <div className="col-lg-3 col-md-4 col-6" key={element._id}>
                    <figure className={clsx(styles.figure, "my-3 my-md-4")}>
                      <Link to="" className={clsx(styles.figLink, "rounded-6")}>
                        <img src={element.image} alt={element.title} />
                      </Link>
                      <figcaption className="mt-2">
                        <div className="w-100 float-left">
                          <div className="d-flex justify-content-between">
                            <strong>
                              <FontAwesomeIcon icon={faHeart} />
                              <span>{element.likes}</span>
                            </strong>
                            <Dropdown
                              menu={{
                                items,
                                onClick: ({ key }) => {
                                  if (key === "0") handleRestoreBtn(element);
                                  if (key === "1") showModal();
                                },
                              }}
                              placement="bottomRight"
                              arrow
                            >
                              <Link onClick={(e) => e.preventDefault()}>
                                <Space>
                                  <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    className={styles.hoverMe}
                                  />
                                </Space>
                              </Link>
                            </Dropdown>
                          </div>
                        </div>
                        <Link
                          to=""
                          className={clsx(
                            styles.figTitle,
                            "text-black d-block mt-1 font-weight-semibold big"
                          )}
                        >
                          {element.title}
                        </Link>
                      </figcaption>
                    </figure>
                    <Modal
                      title="Delete recipe confirmation"
                      centered
                      open={isModalOpen}
                      onOk={() => handleOk(element)}
                      onCancel={handleCancel}
                      okButtonProps={{
                        style: {
                          backgroundColor: "#ff642b",
                          boxShadow: "0 0 0 2px rgba(255, 165, 5, 0.1)",
                        },
                      }}
                      cancelButtonProps={{ type: "text" }}
                      okText={modalLoading ? "Loading..." : "Delete"}
                    >
                      <p>Are you sure you want to delete this recipe?</p>
                    </Modal>
                  </div>
                );
              })}
            </div>
            <div className="text-center py-5">
              <Pagination
                current={current}
                onChange={handlePaginationChange}
                defaultPageSize={12}
                total={archivedRecipes?.pagination.totalDocuments}
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
            subTitle="You haven't archived any recipe yet."
          />
        </>
      )}
    </section>
  );
};

export default Archived;
