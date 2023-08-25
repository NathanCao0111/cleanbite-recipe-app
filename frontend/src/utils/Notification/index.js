import { notification } from "antd";
import { NotificationType } from "../../constants/NotificationType";

const Notification = (message, type) => {
  switch (type) {
    case NotificationType.success:
      notification.success({
        message,
        placement: "topRight",
      });
      break;
    case NotificationType.info:
      notification.info({
        message,
        placement: "topRight",
      });
      break;
    case NotificationType.warning:
      notification.warning({
        message,
        placement: "topRight",
      });
      break;
    case NotificationType.error:
      notification.error({
        message,
        placement: "topRight",
      });
      break;
    default:
      break;
  }
};

export default Notification;
