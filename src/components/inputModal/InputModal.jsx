import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import { setLocationData } from "../../redux/reducers/dataSlice";
import "./InputModal.css";
import carbonCostInitialData from "../../constants/carbonCostInitialData";
import { addTravelMode } from "../../redux/reducers/carbonCostSlice";
import handleDataParsing from "../../lib/handleReadingFiles";

const InputModal = () => {
  const dispatch = useDispatch();

  let locationData = [];
  const modeOfTransport = new Set();

  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const addOrRemoveFileFromProcessing = (info) => {
    const newFiles = [...info.fileList];
    setFiles(newFiles);
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
          handleDataParsing(
            e.target.result,
            setErrorMessage,
            modeOfTransport,
            locationData
          );

          if (index === files.length - 1) {
            sortCarbonCostDataBasedOnModeOfTransportInDataFiles();
            dispatch(setLocationData(locationData));
            cleanUpData();
            dispatch(setCurrentStep(1));
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

  const sortCarbonCostDataBasedOnModeOfTransportInDataFiles = () => {
    const newCarbonCostData = carbonCostInitialData.filter((mode) =>
      modeOfTransport.has(mode.modeName)
    );
    dispatch(addTravelMode(newCarbonCostData));
  };

  const cleanUpData = () => {
    setProcessing(false);
    setFiles([]);
    locationData = [];
  };

  return (
    <div className="input-modal flex flex-column align-center">
      <h2>{!processing ? "Upload file" : "Processing result..."}</h2>
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
