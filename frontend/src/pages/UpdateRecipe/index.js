import { useContext, useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Spin,
  Card,
  Radio,
  Select,
  message,
} from "antd";
import { Formik, ErrorMessage } from "formik";
import "../../scss/components/Button.scss";
import styles from "../../scss/pages/UpdateRecipe/UpdateRecipe.module.scss";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import { recipeSchema } from "../../utils/RecipeSchema";
import { nutritionFieldConfigs } from "../../utils/NutritionFieldConfigs";
import recipesService from "../../services/recipesService";
import { useParams } from "react-router-dom";

const UpdateRecipe = () => {
  const { recipe, recipesLoading, fetchUpdateRecipe, fetchSingleRecipe } =
    useContext(RecipesContext);
  const recipeId = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [returnedFile, setReturnedFile] = useState(null);

  const initialValues = {
    title: recipe?.title,
    description: recipe?.description,
    cuisine: recipe?.cuisine,
    level: recipe?.level,
    ingredients: recipe?.ingredients,
    method: recipe?.method,
    time: {
      preparation: recipe?.time?.preparation,
      cooking: recipe?.time?.cooking,
    },
    serves: recipe?.serves,
    image: recipe?.image,
    nutrition: {
      kcal: recipe?.nutrition?.kcal,
      fat: recipe?.nutrition?.fat,
      saturates: recipe?.nutrition?.saturates,
      carbs: recipe?.nutrition?.carbs,
      sugars: recipe?.nutrition?.sugars,
      fibre: recipe?.nutrition?.fibre,
      protein: recipe?.nutrition?.protein,
      salt: recipe?.nutrition?.salt,
    },
    categories: recipe?.categories,
  };

  const { TextArea } = Input;
  const { Option } = Select;

  const handleUpdateRecipe = async (values) => {
    await fetchUpdateRecipe(recipeId.id, {
      ...values,
      image: returnedFile || recipe?.image,
    });
    setReturnedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile); //formData.append(name, value)

      // call API upload file to cloudinary
      const returnedObj = await recipesService.uploadRecipeImg(formData);

      setReturnedFile(returnedObj?.data?.data);
    } catch (error) {
      message.error(error.response.data.message || "Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleFileUpload();
    }
  }, [selectedFile]);

  useEffect(() => {
    fetchSingleRecipe(recipeId.id);
  }, []);

  return (
    <section className={styles.wrapper}>
      <h5 className="py-3">Update Recipe</h5>
      {recipesLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={recipeSchema}
          onSubmit={handleUpdateRecipe}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: "flex",
                }}
              >
                <Card>
                  <Form.Item
                    label="Title"
                    rules={[{ required: true, message: "Title is required" }]}
                  >
                    <Input
                      spellCheck={false}
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="title">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    rules={[
                      { required: true, message: "Description is required" },
                    ]}
                  >
                    <TextArea
                      spellCheck={false}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      maxLength={300}
                    />
                    <ErrorMessage name="description">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </Form.Item>

                  <Form.Item label="Cuisine" rules={[]}>
                    <Input
                      spellCheck={false}
                      name="cuisine"
                      value={values.cuisine}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item label="Level" rules={[]}>
                    <Radio.Group
                      name="level"
                      value={values.level}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <Radio.Button value="Easy">Easy</Radio.Button>
                      <Radio.Button value="Medium">Medium</Radio.Button>
                      <Radio.Button value="Hard">Hard</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <p>Ingredients</p>
                  {values?.ingredients?.map((ingredient, index) => (
                    <div key={index} className={styles.alignBtn}>
                      <Input
                        spellCheck={false}
                        name={`ingredients[${index}]`}
                        value={values.ingredients[index]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: 20 }}
                        required
                      />
                      {index > 0 && (
                        <Button
                          danger
                          onClick={() => {
                            const updatedIngredients = [...values.ingredients];
                            updatedIngredients.splice(index, 1);
                            setFieldValue("ingredients", updatedIngredients);
                          }}
                          style={{ marginBottom: 30 }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const updatedIngredients = [...values.ingredients, ""];
                      setFieldValue("ingredients", updatedIngredients);
                    }}
                  >
                    Add
                  </Button>

                  <p style={{ marginTop: 40 }}>Methods</p>
                  {values?.method?.map((element, index) => (
                    <div key={index} className={styles.alignBtn}>
                      <TextArea
                        spellCheck={false}
                        name={`method[${index}]`}
                        value={values.method[index]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginBottom: 20 }}
                      />
                      {index > 0 && (
                        <Button
                          danger
                          onClick={() => {
                            const updatedMethods = [...values.method];
                            updatedMethods.splice(index, 1);
                            setFieldValue("method", updatedMethods);
                          }}
                          style={{ marginBottom: 30 }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const updatedMethods = [...values.method, ""];
                      setFieldValue("method", updatedMethods);
                    }}
                  >
                    Add
                  </Button>

                  <Form.Item
                    label="Preparation Time"
                    rules={[
                      {
                        required: true,
                        message: "Preparation Time is required",
                      },
                    ]}
                    style={{ marginTop: 40 }}
                  >
                    <Input
                      spellCheck={false}
                      name="time.preparation"
                      value={values.time.preparation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="time.preparation">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </Form.Item>

                  <Form.Item
                    label="Cooking Time"
                    rules={[
                      {
                        required: true,
                        message: "Cooking Time is required",
                      },
                    ]}
                  >
                    <Input
                      spellCheck={false}
                      name="time.cooking"
                      value={values.time.cooking}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="time.cooking">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </Form.Item>

                  <Form.Item
                    label="Serves"
                    rules={[{ required: true, message: "Serves is required" }]}
                  >
                    <Input
                      spellCheck={false}
                      name="serves"
                      value={values.serves}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="serves">
                      {(msg) => <div className={styles.error}>{msg}</div>}
                    </ErrorMessage>
                  </Form.Item>

                  <Form.Item label="Categories">
                    <Select
                      mode="multiple"
                      name="categories"
                      value={values.categories}
                      onChange={(selectedOptions) =>
                        setFieldValue("categories", selectedOptions)
                      }
                      onBlur={handleBlur}
                    >
                      <Option value="Meat">Meat</Option>
                      <Option value="Pastries">Pastries</Option>
                      <Option value="Vegan">Vegan</Option>
                      <Option value="Salad">Salad</Option>
                      <Option value="Pasta">Pasta</Option>
                      <Option value="Desserts">Desserts</Option>
                      <Option value="Less than 30 min">Less than 30 min</Option>
                      <Option value="Breakfast">Breakfast</Option>
                    </Select>
                  </Form.Item>

                  <h6>Nutrition Facts</h6>
                  {nutritionFieldConfigs?.map((field) => (
                    <Form.Item key={field.name} label={field.label}>
                      <Input
                        spellCheck={false}
                        name={`nutrition.${field.name}`}
                        value={values.nutrition[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                  ))}

                  <h6>Image</h6>
                  <div className="d-flex flex-wrap pt-3 pt-md-5 pb-4 mb-2 align-items-center justify-content-center">
                    <div className={styles.recipeImg}>
                      <img src={returnedFile || recipe?.image} alt="recipe" />
                    </div>
                    <div className={styles.recipeBtns}>
                      <Button color="outline-dark">
                        <label htmlFor="image">
                          {loading ? "Loading..." : "Upload Recipe Image"}
                        </label>
                        <input
                          type="file"
                          id="image"
                          hidden
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </Button>
                    </div>
                  </div>

                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 40,
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="form-button"
                    >
                      Update Recipe
                    </Button>
                  </Form.Item>
                </Card>
              </Space>
            </Form>
          )}
        </Formik>
      )}
    </section>
  );
};

export default UpdateRecipe;
