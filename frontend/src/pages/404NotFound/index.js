import { Result } from "antd";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you are looking for does not exist."
    />
  );
};

export default NotFound;
