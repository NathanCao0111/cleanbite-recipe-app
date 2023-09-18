import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "../../scss/pages/404NotFound/404NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const handleHomeNavigate = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you are looking for does not exist."
      extra={
        <Button
          type="primary"
          onClick={handleHomeNavigate}
          className={styles.btn}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
