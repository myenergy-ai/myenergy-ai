import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { WarningOutlined, CheckSquareOutlined } from "@ant-design/icons";

import "./ErrorModal.css";

const ErrorModal = ({ modalState, handleStateChange }) => {
  return (
    <Modal
      visible={modalState}
      onOk={handleStateChange}
      onCancel={handleStateChange}
      cancelButtonProps={{ type: "default" }}
      okButtonProps={{ type: "danger" }}
      okText="Yes, proceed"
    >
      <div className="error-modal-top flex justify-center align-center">
        <div className="error-modal-top-heading flex justify-center align-center flex-column">
          <WarningOutlined className="error-modal-warning-icon" />
          <h2>There was an error processing your request</h2>
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
