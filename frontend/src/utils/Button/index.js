import { Button } from "antd";
import "../../scss/components/Button.scss";

const AntdButton = (props) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className="form-button"
    >
      {props.description}
    </Button>
  );
};

export default AntdButton;
