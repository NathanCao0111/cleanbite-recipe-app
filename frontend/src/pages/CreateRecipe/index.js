import { useState, useEffect, useContext } from "react";
import { Button, Form, Input, Space, Spin, Card } from "antd";
import "../../scss/components/Button.scss";
import * as Yup from "yup";
import styles from "../../scss/pages/CreateRecipe/CreateRecipe.module.scss";
import RecipesContext from "../../contexts/RecipesContext/RecipesContext";

const CreateRecipe = () => {
  const recipeSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, "Too short!")
      .max(100, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
    description: Yup.string()
      .min(1, "Too short!")
      .max(300, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
    cuisine: Yup.string().optional(),
    level: Yup.string()
      .min(1, "Too short!")
      .max(100, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
    ingredients: Yup.array().required(),
    method: Yup.array().required(),
    time: Yup.object().shape({
      preparation: Yup.string()
        .min(1, "Too short!")
        .max(100, "Too long!")
        .trim("Cannot include leading and trailing spaces")
        .required(),
      cooking: Yup.string()
        .min(1, "Too short!")
        .max(100, "Too long!")
        .trim("Cannot include leading and trailing spaces")
        .required(),
    }),
    serves: Yup.string()
      .min(1, "Too short!")
      .max(100, "Too long!")
      .trim("Cannot include leading and trailing spaces")
      .required(),
    image: Yup.string()
      .trim("Cannot include leading and trailing spaces")
      .url("Invalid URL")
      .required(),
    nutrition: Yup.object().shape({
      kcal: Yup.string().optional(),
      fat: Yup.string().optional(),
      saturates: Yup.string().optional(),
      carbs: Yup.string().optional(),
      sugars: Yup.string().optional(),
      fibre: Yup.string().optional(),
      protein: Yup.string().optional(),
      salt: Yup.string().optional(),
    }),
  });

  const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          }
        );
    }, [values]);

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        className="form-button"
      >
        Create Recipe
      </Button>
    );
  };

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { recipesLoading, fetchCreateRecipe } = useContext(RecipesContext);

  const yupSync = {
    async validator({ field }, value) {
      await recipeSchema.validateSyncAt(field, { [field]: value });
    },
  };

  const onFinish = async (values) => {
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
        <Form
          name="basic"
          layout="vertical"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
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
                required
                hasFeedback
                validateTrigger="onBlur"
                rules={[yupSync]}
              >
                <Input
                  placeholder="Slow cooker beef bourguignon"
                  spellCheck={false}
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                required
                hasFeedback
                validateTrigger="onBlur"
                rules={[yupSync]}
              >
                <TextArea
                  rows={4}
                  maxLength={300}
                  placeholder="Feed a crowd or freeze a batch of our comforting beef bourguignon. This classic recipe uses slow-cooked beef and red wine for a deliciously rich stew"
                  spellCheck={false}
                />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <SubmitButton form={form} />
              </Form.Item>
            </Card>
          </Space>
        </Form>
      )}
    </section>
  );
};
export default CreateRecipe;
