import { Button } from "antd";

const AntdButton = (props) => {
  return (
    <Button type="primary" htmlType="submit" className="form-button">
      {props.description}
    </Button>
  );
};

export default AntdButton;
