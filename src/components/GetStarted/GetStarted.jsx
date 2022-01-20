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
      <div className="getStarted align-center flex justify-between">
        <div className="getStarted__content">
          <div className="getStarted__main flex justify-between align-items-top flex-column">
            <h2>Analyse the carbon content of your travel</h2>
            <p>
              myenergy.ai is a secure, open-source tool that makes it easy to
              asses the carbon content of every journey recorded in your Google,
              Waze or Apple location history. Giving you personalised insights
              to better understand your carbon footprint.
            </p>
          </div>
          <div className="getStarted__userStepsInfo flex">
            <div className="getStarted__userStepsContainer flex flex-column justify-between">
              <div className="getStarted__userStep flex">
                <Button type="primary" shape="circle">
                  1
                </Button>

                <p>Upload travel data</p>
              </div>
              <div className="getStarted__userStep flex">
                <Button type="primary" shape="circle">
                  3
                </Button>

                <p>Set work hours</p>
              </div>
            </div>
            <div className="getStarted__userStepsContainer flex flex-column justify-between">
              <div className="getStarted__userStep flex">
                <Button type="primary" shape="circle">
                  2
                </Button>

                <p>Adjust carbon footprint</p>
              </div>
              <div className="getStarted__userStep flex">
                <Button type="primary" shape="circle">
                  4
                </Button>

                <p>Download results</p>
              </div>
            </div>
          </div>
          <div className="getStarted__buttonBox flex align-center">
            <Button
              onClick={() => setIsDataPolicyModalVisible(true)}
              type="outline"
              className="getStarted__dataPolicyButton flex justify-center align-center flex-wrap"
            >
              Data Policy
            </Button>
            <Button
              onClick={() => navigate(ROUTES.CARBON_FOOT_PRINT)}
              type="primary"
              className="getStarted__button flex justify-center align-center flex-wrap"
            >
              Get Started
            </Button>
          </div>
        </div>
        <img loading="lazy" className="getStarted__image" src={map} alt="map" />
      </div>
    </>
  );
};

export default GetStarted;
