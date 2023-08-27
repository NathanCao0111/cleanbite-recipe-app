import { Button } from "antd";
import "../../scss/components/Button.scss";
import clsx from "clsx";

const AntdButton = (props) => {
  return (
    <Button
      type={props.type}
      htmlType="submit"
      className={clsx(
        "form-button",
        props.profileBtn === "profile" && "profile-btn",
        props.profileBtn === "primary" && "profile-btn primary-btn",
        props.profileBtn === "default" && "profile-btn default-btn"
      )}
    >
      {props.description}
    </Button>
  );
};

export default AntdButton;
