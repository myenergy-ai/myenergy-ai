import React, { useRef, useState } from "react";
import { Button, Modal, Popover } from "antd";
import { Link } from "react-router-dom";
import { WarningOutlined, CheckSquareOutlined } from "@ant-design/icons";
import "./ErrorModal.css";
import { useSelector } from "react-redux";
import {
  selectError,
  setCurrentStep,
  setError,
} from "../../redux/reducers/appSlice";
import { useDispatch } from "react-redux";
import { LOCATION_DATA_STEP } from "../../constants/stepConstants";
import { resetAllStates } from "../../lib/resetAllStates";

const ErrorModal = () => {
  const [popOverForIssueVisible, setPopOverForIssueVisible] = useState(false);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const raiseIssueRef = useRef(null);
  const [instructionsShown, setInstructionsShown] = useState(false);

  /**
   * Function to close the modal and clean up the data.
   */
  const handleExit = () => {
    resetAllStates();
    dispatch(setError(""));
    dispatch(setCurrentStep(LOCATION_DATA_STEP));
  };

  /**
   * Function to show the raise issue option
   */
  const raiseAnIssue = (
    <>
      <ul className="errorModal__issueSteps">
        <li>1. Take a screenshot of the screen.</li>
        <li>
          2. Click on the Raise button and create an issue at our github page.
        </li>
        <li>
          3. In the issue provide the details, of the steps and the type of data
          as well for us to solve it.
        </li>
      </ul>
      <Button
        type="primary"
        onClick={() => {
          setInstructionsShown(true);
          handleVisibleChange(false);
        }}
      >
        Ok
      </Button>
    </>
  );

  const raiseIssue = () => {
    window.open("https://github.com/myenergy-ai/myenergy-ai/issues", "_blank");
    handleExit();
  };

  const handleVisibleChange = (visible) => {
    setPopOverForIssueVisible(visible);
  };

  return (
    <Modal
      visible={error !== ""}
      onCancel={handleExit}
      footer={[
        <Button type="primary" key="back" onClick={handleExit}>
          Ok
        </Button>,
        !instructionsShown ? (
          <Popover
            content={raiseAnIssue}
            trigger="click"
            visible={popOverForIssueVisible}
            onVisibleChange={handleVisibleChange}
          >
            <Button type="primary">Raise an Issue</Button>
          </Popover>
        ) : (
          <Button type="primary" onClick={raiseIssue}>
            Raise
          </Button>
        ),
      ]}
    >
      <div className="errorModal__top flex justify-center align-center">
        <div className="errorModal__topHeading flex justify-center align-center flex-column">
          <WarningOutlined className="errorModal__warningIcon" />
          <h3>{error}</h3>
        </div>
      </div>
      <strong>
        <p className="errorModal__infoText">
          I understand that by dismissing this dialog -
        </p>
      </strong>
      <div className="errorModal__items flex align-center">
        <CheckSquareOutlined className="errorModal__itemsIcon" />
        <p className="errorModal__infoText">
          All location data uploaded will be deleted immediately
        </p>
      </div>
      <div className="errorModal__items flex align-center">
        <CheckSquareOutlined className="errorModal__itemsIcon" />
        <p className="errorModal__infoText">
          Any other information provided will be deleted
        </p>
      </div>
      <div className="errorModal__items flex align-center">
        <p className="errorModal__infoText">
          If you have any questions, please contact{" "}
          <Link to="#">dev@advanced-infrastructure.co.uk</Link>
        </p>
      </div>
      <a
        ref={raiseIssueRef}
        className="hidden"
        href="https://github.com/myenergy-ai/myenergy-ai/issues"
        target="_blank"
        rel="noreferrer"
      >
        None
      </a>
    </Modal>
  );
};

export default ErrorModal;
