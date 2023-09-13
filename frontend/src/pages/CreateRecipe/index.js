import { useContext } from "react";
import { Button, Form, Input, Space, Spin, Card, Radio, Select } from "antd";
import { Formik } from "formik";
import "../../scss/components/Button.scss";
import styles from "../../scss/pages/CreateRecipe/CreateRecipe.module.scss";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";
import { recipeSchema } from "../../utils/RecipeSchema";
import UploadDragger from "../../utils/UploadDragger";

const CreateRecipe = () => {
  const initialValues = {
    title: "",
    description: "",
    cuisine: "",
    level: "",
    ingredients: [],
    method: [],
    time: {
      preparation: "",
      cooking: "",
    },
    serves: "",
    image: "",
    nutrition: {
      kcal: "",
      fat: "",
      saturates: "",
      carbs: "",
      sugars: "",
      fibre: "",
      protein: "",
      salt: "",
    },
    categories: [],
  };

  const nutritionFieldConfigs = [
    {
      name: "kcal",
      label: "Kcal",
      placeholder: "Enter kcal",
    },
    {
      name: "fat",
      label: "Fat",
      placeholder: "Enter fat",
    },
    {
      name: "saturates",
      label: "Saturates",
      placeholder: "Enter saturates",
    },
    {
      name: "carbs",
      label: "Carbs",
      placeholder: "Enter carbs",
    },
    {
      name: "sugars",
      label: "Sugars",
      placeholder: "Enter sugars",
    },
    {
      name: "fibre",
      label: "Fibre",
      placeholder: "Enter fibre",
    },
    {
      name: "protein",
      label: "Protein",
      placeholder: "Enter protein",
    },
    {
      name: "salt",
      label: "Salt",
      placeholder: "Enter salt",
    },
  ];

  const { TextArea } = Input;
  const { Option } = Select;
  const { recipesLoading, fetchCreateRecipe } = useContext(RecipesContext);

  const handleCreateRecipe = async (values) => {
    console.log(values);
    await fetchCreateRecipe(values);
  };

  return (
    <section className={styles.wrapper}>
      <h5 className="py-3">Create a Recipe</h5>
      {recipesLoading ? (
        <div className={styles.spinContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={recipeSchema}
          onSubmit={handleCreateRecipe}
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
                    name="title"
                    rules={[{ required: true, message: "Title is required" }]}
                  >
                    <Input
                      placeholder="E.g. Slow cooker beef bourguignon"
                      spellCheck={false}
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { required: true, message: "Description is required" },
                    ]}
                  >
                    <TextArea
                      placeholder="E.g. Feed a crowd or freeze a batch of our comforting beef bourguignon. This classic recipe uses slow-cooked beef and red wine for a deliciously rich stew"
                      spellCheck={false}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      maxLength={300}
                    />
                  </Form.Item>

                  <Form.Item label="Cuisine" name="cuisine" rules={[]}>
                    <Input
                      placeholder="E.g. French"
                      spellCheck={false}
                      name="cuisine"
                      value={values.cuisine}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item label="Level" name="level" rules={[]}>
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
                  {values.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <Input
                        placeholder="E.g. 3 tbsp olive oil"
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
                          style={{ marginBottom: 40 }}
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
                  {values.method.map((element, index) => (
                    <div key={index}>
                      <TextArea
                        placeholder="E.g. Turn the slow cooker to low and heat 2 tbsp of the oil in a large frying pan. Season the meat and fry for 3-4 mins in batches until browned all over, scooping out each batch with a slotted spoon and transferring the browned meat to a plate."
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
                          style={{ marginBottom: 40 }}
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
                    name="preparation"
                    rules={[
                      {
                        required: true,
                        message: "Preparation Time is required",
                      },
                    ]}
                    style={{ marginTop: 40 }}
                  >
                    <Input
                      placeholder="E.g. 20 mins"
                      spellCheck={false}
                      name="time.preparation"
                      value={values.time.preparation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Cooking Time"
                    name="cooking"
                    rules={[
                      {
                        required: true,
                        message: "Cooking Time is required",
                      },
                    ]}
                  >
                    <Input
                      placeholder="E.g. 20 mins"
                      spellCheck={false}
                      name="time.cooking"
                      value={values.time.cooking}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Serves"
                    name="serves"
                    rules={[{ required: true, message: "Serves is required" }]}
                  >
                    <Input
                      placeholder="E.g. 6-8"
                      spellCheck={false}
                      name="serves"
                      value={values.serves}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Item>

                  <Form.Item label="Categories" name="categories">
                    <Select
                      mode="multiple"
                      placeholder="Please select in these categories"
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

                  <h6 style={{ marginTop: 40, fontSize: 24 }}>
                    Nutrition Facts
                  </h6>
                  {nutritionFieldConfigs?.map((field) => (
                    <Form.Item
                      key={field.name}
                      label={field.label}
                      name={field.name}
                    >
                      <Input
                        placeholder={field.placeholder}
                        spellCheck={false}
                        name={`nutrition.${field.name}`}
                        value={values.nutrition[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                  ))}

                  <h6 style={{ marginTop: 40, marginBottom: 20, fontSize: 24 }}>
                    Image
                  </h6>
                  <UploadDragger label="Upload Recipe Image" name="image" />

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
                      Create Recipe
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

export default CreateRecipe;
