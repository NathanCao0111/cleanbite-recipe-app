import { Upload, message } from "antd";
import { useField, useFormikContext } from "formik";
import { InboxOutlined } from '@ant-design/icons';

const UploadDragger = ({ label, name }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (info) => {
    if (info.file.status === "done") {
      setFieldValue(name, info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    name,
    multiple: false,
    beforeUpload: (file) => {
      setFieldValue(name, file);
      return false;
    },
    fileList: field.value ? [field.value] : [],
    onChange: handleChange,
  };

  return (
    <div>
      <Upload.Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{label}</p>
        <p className="ant-upload-hint">
          Click or drag file to this area to upload
        </p>
      </Upload.Dragger>
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default UploadDragger;
