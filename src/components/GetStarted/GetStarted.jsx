import React, { useState } from "react";
import "./GetStarted.css";
import { Button, Modal } from "antd";
import map from "../../assets/map.png";
import { useNavigate } from "react-router";
import ROUTES from "../../routes/routes";

const GetStarted = () => {
  const navigate = useNavigate();
  const [isDataPolicyModalVisible, setIsDataPolicyModalVisible] =
    useState(false);

  return (
    <>
      <Modal
        title="Data policy"
        onCancel={() => setIsDataPolicyModalVisible(false)}
        visible={isDataPolicyModalVisible}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={() => setIsDataPolicyModalVisible(false)}
          >
            Ok
          </Button>,
        ]}
      >
        <p>
          It’s simple - we don’t store anything. All information that you
          provide to us does not leave your browser. The application creates
          secure sessions to cache essential data but is not stored permanently
          on any database or on files on our servers. When you exit the
          application or refresh the page, any information you’ve provided will
          be lost forever. If you have any questions or concerns about data
          storage or other data policies, please email us at
          dev@advanced-infrastructure.co.uk
        </p>
      </Modal>
      <div className="get-started flex justify-between">
        <div className="get-started-content">
          <div className="get-started-main flex  justify-between align-items-top flex-column">
            <h1>Hi there!</h1>
            <p>
              This is an application made for calculating the carbon emitted
              while travelling.
            </p>
          </div>
          <div className="user-steps-info flex">
            <div className="user-steps-container flex flex-column justify-between">
              <div className="user-step flex">
                <Button
                  className="steps-info-btn"
                  type="primary"
                  shape="circle"
                >
                  1
                </Button>

                <p>Upload Travel Data</p>
              </div>
              <div className="user-step flex">
                <Button
                  className="steps-info-btn"
                  type="primary"
                  shape="circle"
                >
                  3
                </Button>

                <p>Set work hours</p>
              </div>
            </div>
            <div className="user-steps-container flex flex-column justify-between">
              <div className="user-step flex">
                <Button
                  className="steps-info-btn"
                  type="primary"
                  shape="circle"
                >
                  2
                </Button>

                <p>Adjust Cost</p>
              </div>
              <div className="user-step flex">
                <Button
                  className="steps-info-btn"
                  type="primary"
                  shape="circle"
                >
                  4
                </Button>

                <p>Download results</p>
              </div>
            </div>
          </div>
          <div className="get-started-button-box">
            <Button
              onClick={() => setIsDataPolicyModalVisible(true)}
              type="outline"
              className="data-policy-button flex justify-center align-center flex-wrap"
            >
              Data Policy
            </Button>
            <Button
              onClick={() => navigate(ROUTES.CARBON_FOOT_PRINT)}
              type="primary"
              className="get-started-button flex justify-center align-center flex-wrap"
            >
              Get Started
            </Button>
          </div>
        </div>
        <img className="get-started-image" src={map} alt="map" />
      </div>
    </>
  );
};

export default GetStarted;
