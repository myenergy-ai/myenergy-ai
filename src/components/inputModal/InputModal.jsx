import {
  InboxOutlined,
  GoogleOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  setError,
  setHelpModalVisibility,
} from "../../redux/reducers/appSlice";
import "./InputModal.css";
import Dragger from "antd/lib/upload/Dragger";
import waze from "../../assets/waze.svg";
import { setTravelData } from "../../lib/setTravelData";
import { CARBON_COST_STEP } from "../../constants/stepConstants";

const InputModal = () => {
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const addOrRemoveFileFromProcessing = (info) => {
    const uniqueFiles = info.fileList.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.name === value.name && t.size === value.size)
    );
    setFiles(uniqueFiles);
  };

  const props = {
    onChange: addOrRemoveFileFromProcessing,
    multiple: true,
    accept: ".json",
    beforeUpload: () => {
      return false;
    },
    fileList: files,
  };

  const handleFileScanOrCancel = () => {
    if (processing) {
      cleanUpData();
      return;
    }

    setProcessing(true);

    try {
      files.map((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            if (index === 0) {
              setTravelData(e.target.result, true, true);
            } else {
              setTravelData(e.target.result, false, true);
            }
            if (index === files.length - 1) {
              cleanUpData();
              dispatch(setCurrentStep(CARBON_COST_STEP));
            }
          } catch (error) {
            setErrorMessage(error.message);
          }
        };
        reader.readAsText(file.originFileObj);
        return file;
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const setErrorMessage = (message) => {
    cleanUpData();
    dispatch(setError(message));
  };

  const cleanUpData = () => {
    setProcessing(false);
    setFiles([]);
  };

  const comingSoon = <p>Coming soon...</p>;

  return (
    <div className="inputModal flex flex-column align-center justify-center">
      <h2>
        {!processing
          ? " Upload your Semantic Location History "
          : "Processing result..."}
      </h2>
      {!processing && (
        <Dragger {...props} fileList={files}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
      )}
      <Button
        disabled={files.length < 1}
        type="primary"
        onClick={handleFileScanOrCancel}
      >
        {!processing ? "Next" : "Cancel"}
      </Button>
      <div className="inputModal__supportedPlatforms flex align-center">
        <p>Supported platforms:</p>
        <GoogleOutlined
          onClick={() => dispatch(setHelpModalVisibility(true))}
        />
        <Popover content={comingSoon}>
          <AppleOutlined />
        </Popover>
        <Popover content={comingSoon}>
          <img
            loading="lazy"
            className="inputModal__wazeIcon"
            src={waze}
            alt=""
          />
        </Popover>
      </div>
    </div>
  );
};

export default InputModal;
