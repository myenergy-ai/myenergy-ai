import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import { setLocationData } from "../../redux/reducers/dataSlice";
import "./InputModal.css";
import carbonCostInitialData from "../../lib/carbonCostInitialData";
import { addTravelMode } from "../../redux/reducers/carbonCostSlice";
import {
  DATA_OBJECT_BASE_KEY,
  DISTANCE_OBJECT_NAME,
  END_LOCATION_FIELD_NAME,
  END_LOCATION_OBJECT_NAME,
  END_TIME_FIELD_NAME,
  FIELD_THAT_HAS_TRAVEL_DATA,
  INPUT_FILE_TYPES,
  LOCATION_LAT_LAN_DIVIDE_FACTOR,
  MODE_OF_TRANSPORT_OBJECT_NAME,
  START_LOCATION_FIELD_NAME,
  START_LOCATION_OBJECT_NAME,
  START_TIME_FIELD_NAME,
  TIME_OBJECT_NAME,
} from "../../constants/fields";

const InputModal = () => {
  const dispatch = useDispatch();

  /**
   * State to maintain all the files uploaded by the user
   */
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  /**
   * Function to handle file upload
   */
  const handleChange = (info) => {
    const newFiles = [...info.fileList];
    setFiles(newFiles);
  };

  /**
   * This function stops the files from getting uploaded to the action url
   */
  const stopFromUploading = () => {
    return false;
  };

  /**
   * Setting up the upload component to accept only json and csv files
   */
  const props = {
    onChange: handleChange,
    multiple: true,
    accept: INPUT_FILE_TYPES,
    beforeUpload: stopFromUploading,
    fileList: files,
  };

  /**
   * function for scanning the data and storing it to redux store
   */
  let locationData = [];
  const modeOfTransport = new Set();
  const handleFileScanOrCancel = () => {
    /**
     * For cancelling processing
     */
    if (processing) {
      cleanUpData();
      return;
    }
    setProcessing(true);

    /**
     * For each file we iterate over all the elements and select only required fields
     */
    try {
      files.map((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          /**
           * Checking if the data has the field which is required for the processing.
           */
          let arrayObjectField = checkForAavailableFieldsInObject(
            e.target.result
          );
          if (arrayObjectField === "") {
            setErrorMessage(
              "Please select only those files that are named by year followed by month given by Google."
            );
            return;
          }
          /**
           * Filtering out only travel data and rejecting other data
           */
          let objectKeyThatHasTravelData = "";
          const fileData = JSON.parse(e.target.result)[
            arrayObjectField
          ]?.filter((file) => {
            let hasData = false;
            FIELD_THAT_HAS_TRAVEL_DATA.forEach((key) => {
              if (file[key]) {
                hasData = true;
                objectKeyThatHasTravelData = key;
              }
              return key;
            });
            return hasData;
          });
          /**
           * For each item collect only required fields
           */
          let dataTypeIndex = -1;
          START_LOCATION_OBJECT_NAME.map((value, index) => {
            if (fileData[0][objectKeyThatHasTravelData].hasOwnProperty(value)) {
              dataTypeIndex = index;
            }
            return value;
          });
          fileData?.map((item) => {
            modeOfTransport.add(
              item[objectKeyThatHasTravelData][
                MODE_OF_TRANSPORT_OBJECT_NAME[dataTypeIndex]
              ]
            );
            locationData.push({
              key: locationData.length + 1,
              startLatitude:
                item[objectKeyThatHasTravelData][
                  START_LOCATION_OBJECT_NAME[dataTypeIndex]
                ][START_LOCATION_FIELD_NAME[dataTypeIndex]] /
                LOCATION_LAT_LAN_DIVIDE_FACTOR,
              startLongitude:
                item[objectKeyThatHasTravelData][
                  START_LOCATION_OBJECT_NAME[dataTypeIndex]
                ][END_LOCATION_FIELD_NAME[dataTypeIndex]] /
                LOCATION_LAT_LAN_DIVIDE_FACTOR,
              endLatitude:
                item[objectKeyThatHasTravelData][
                  END_LOCATION_OBJECT_NAME[dataTypeIndex]
                ][START_LOCATION_FIELD_NAME[dataTypeIndex]] /
                LOCATION_LAT_LAN_DIVIDE_FACTOR,
              endLongitude:
                item[objectKeyThatHasTravelData][
                  END_LOCATION_OBJECT_NAME[dataTypeIndex]
                ][END_LOCATION_FIELD_NAME[dataTypeIndex]] /
                LOCATION_LAT_LAN_DIVIDE_FACTOR,
              startTimestamp:
                item[objectKeyThatHasTravelData][
                  TIME_OBJECT_NAME[dataTypeIndex]
                ][START_TIME_FIELD_NAME[dataTypeIndex]],
              endTimestamp:
                item[objectKeyThatHasTravelData][
                  TIME_OBJECT_NAME[dataTypeIndex]
                ][END_TIME_FIELD_NAME[dataTypeIndex]],
              distance: item[objectKeyThatHasTravelData][DISTANCE_OBJECT_NAME],
              activityType:
                item[objectKeyThatHasTravelData][
                  MODE_OF_TRANSPORT_OBJECT_NAME[dataTypeIndex]
                ],
              carbonCost: 0,
            });
            return item;
          });

          /**
           * Checking if this is the last fie if so push the data to redux store and move to next step
           */
          if (index === files.length - 1) {
            sortCarbonCostData();
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

  const checkForAavailableFieldsInObject = (data) => {
    let objectKey = "";
    const objectData = JSON.parse(data);
    DATA_OBJECT_BASE_KEY.map((field) => {
      if (objectData.hasOwnProperty(field)) {
        objectKey = field;
      }
      return field;
    });
    return objectKey;
  };

  /**
   * Function to filter out carbon cost and show only selected modes of transport.
   */
  const sortCarbonCostData = () => {
    const newCarbonCostData = carbonCostInitialData.filter((mode) =>
      modeOfTransport.has(mode.modeName)
    );
    dispatch(addTravelMode(newCarbonCostData));
  };

  /**
   * Cleanup data
   */
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
