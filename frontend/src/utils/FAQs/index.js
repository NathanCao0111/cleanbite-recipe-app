import { Modal } from "antd";

const Faqs = (values) => {
  Modal.info({
    title: "FAQS",
    content: (
      <div>
        <p>{values}</p>
      </div>
    ),
    onOk() {},
  });
};

export default Faqs;
