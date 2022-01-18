import {
  InboxOutlined,
  GoogleOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { Button, message, Popover } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  setError,
  setHelpModalVisisbility,
} from "../../redux/reducers/appSlice";
import { setLocationData } from "../../redux/reducers/dataSlice";
import "./InputModal.css";
import carbonCostInitialData from "../../constants/carbonCostInitialData";
import { appendTravelMode } from "../../redux/reducers/carbonCostSlice";
import handleDataParsing from "../../lib/handleReadingFiles";
import Dragger from "antd/lib/upload/Dragger";
import waze from "../../assets/waze.svg";

const InputModal = () => {
  const dispatch = useDispatch();

  let locationData = [];
  const modeOfTransport = new Set();
  const notIncludingModesOfTransport = new Set();

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
          handleDataParsing(
            e.target.result,
            setErrorMessage,
            modeOfTransport,
            locationData,
            notIncludingModesOfTransport
          );

          if (index === files.length - 1) {
            if (locationData.length > 1) {
              if (notIncludingModesOfTransport.size > 0) {
                warning();
              }
              sortCarbonCostDataBasedOnModeOfTransportInDataFiles();
              dispatch(setLocationData(locationData));
              cleanUpData();
              dispatch(setCurrentStep(1));
            } else {
              error();
              cleanUpData();
            }
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
    dispatch(appendTravelMode(newCarbonCostData));
  };

  const cleanUpData = () => {
    setProcessing(false);
    setFiles([]);
    locationData = [];
    modeOfTransport.clear();
    notIncludingModesOfTransport.clear();
  };

  const error = () => {
    setErrorMessage(
      "No valid data found. Please check the format of the data or upload google takeout data which are of 2019 and onwards."
    );
  };

  const warning = () => {
    message.warning(
      `We only support 'FLYING IN_BUS IN_TRAIN IN_PASSENGER_VEHICLE MOTORCYCLING' travel modes. So your travel datas including '${new Array(
        ...notIncludingModesOfTransport
      ).join(" ")}' as travel modes are skipped.`
    );
  };

  const comingSoon = <p>Coming Soon...</p>;

  return (
    <div className="inputModal flex flex-column align-center justify-center">
      <h2>{!processing ? "Upload travel history" : "Processing result..."}</h2>
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
          onClick={() => dispatch(setHelpModalVisisbility(true))}
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
