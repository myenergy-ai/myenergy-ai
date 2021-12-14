import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import "./InputModal.css";

const InputModal = () => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleChange = (info) => {
    const newFiles = [...info.fileList];
    setFiles(newFiles);
  };

  const handleContentOfFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (file.name.endsWith(".csv")) {
        console.log(e.target.result);
      } else {
        console.log(e.target.result);
      }
    };
    reader.readAsText(file);

    return false;
  };

  const props = {
    onChange: handleChange,
    multiple: true,
    action: "//jsonplaceholder.typicode.com/posts/",
    accept: ".json, .csv",
    beforeUpload: handleContentOfFile,
    fileList: files,
  };

  const handleFileScanOrCancel = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setFiles([]);
      dispatch(setCurrentStep(1));
    }, 5000);
  };

  return (
    <div className="input-modal flex flex-column align-center">
      <h4>{!processing ? "Upload file" : "Processing result..."}</h4>
      {!processing && (
        <Upload {...props} fileList={files}>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      )}
      <Button
        disabled={files.length < 1}
        type="primary"
        onClick={handleFileScanOrCancel}
      >
        {!processing ? "Next" : "Cancel"}
      </Button>
    </div>
  );
};

export default InputModal;
