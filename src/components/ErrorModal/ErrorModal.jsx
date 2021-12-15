import React from "react";
import { Modal } from "antd";
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

const ErrorModal = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleStateChange = () => {
    dispatch(setError(""));
    dispatch(setCurrentStep(0));
  };

  return (
    <Modal
      visible={error !== ""}
      onOk={handleStateChange}
      onCancel={handleStateChange}
      cancelButtonProps={{ type: "default" }}
      okButtonProps={{ type: "danger" }}
      okText="Yes, proceed"
    >
      <div className="error-modal-top flex justify-center align-center">
        <div className="error-modal-top-heading flex justify-center align-center flex-column">
          <WarningOutlined className="error-modal-warning-icon" />
          <h2>{error}</h2>
        </div>
      </div>
      <strong>
        <p>I understand that by dismissing this dialog -</p>
      </strong>
      <div className="error-items flex   align-center">
        <CheckSquareOutlined className="error-items-icon" />
        <p>All location data uploaded will be deleted immediately</p>
      </div>
      <div className="error-items flex   align-center">
        <CheckSquareOutlined className="error-items-icon" />
        <p>Any other information provided will be deleted</p>
      </div>
      <div className="error-items flex   align-center">
        <p>
          If you have any questions, please contact{" "}
          <Link to="#">test@test.com</Link>
        </p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
