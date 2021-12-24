import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import { setLocationData } from "../../redux/reducers/dataSlice";
import "./InputModal.css";

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
    accept: ".json",
    beforeUpload: stopFromUploading,
    fileList: files,
  };

  /**
   * function for scanning the data and storing it to redux store
   */
  let locationData = [];
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
          if (!JSON.parse(e.target.result).hasOwnProperty("timelineObjects")) {
            cleanUpData();
            dispatch(
              setError(
                "Please select only those files that are named by year followed by month given by Google."
              )
            );
            return;
          }
          /**
           * Filtering out only travel data and rejecting other data
           */
          const fileData = JSON.parse(e.target.result).timelineObjects.filter(
            (file) => file.activitySegment
          );

          /**
           * For each item collect only required fields
           */
          fileData.map((item) => {
            locationData.push({
              key: locationData.length + 1,
              startLatitude:
                item.activitySegment.startLocation.latitudeE7 / 10000000,
              startLongitude:
                item.activitySegment.startLocation.longitudeE7 / 10000000,
              endLatitude:
                item.activitySegment.endLocation.latitudeE7 / 10000000,
              endLongitude:
                item.activitySegment.endLocation.longitudeE7 / 10000000,
              startTimestamp: item.activitySegment.duration.startTimestampMs,
              endTimestamp: item.activitySegment.duration.endTimestampMs,
              distance: item.activitySegment.distance,
              activityType: item.activitySegment.activityType,
              activityConfidence: item.activitySegment.confidence,
              activityProbability:
                item.activitySegment.activities[0].probability,
              carbonCost: 0,
            });
            return item;
          });

          /**
           * Checking if this is the last fie if so push the data to redux store and move to next step
           */
          if (index === files.length - 1) {
            locationData = locationData.filter((data) => data.distance);
            dispatch(setLocationData(locationData));
            cleanUpData();
            dispatch(setCurrentStep(1));
          }
        };
        reader.readAsText(file.originFileObj);
        return file;
      });
    } catch (error) {
      cleanUpData();
      dispatch(setError(error.message));
      dispatch(setLocationData(null));
    }
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
