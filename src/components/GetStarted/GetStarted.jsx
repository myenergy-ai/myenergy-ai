import React from "react";
import "./GetStarted.css";
import { Button } from "antd";
import map from "../../assets/map.png";
import { useNavigate } from "react-router";
import ROUTES from "../../routes/routes";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="get-started flex justify-between align-center">
      <div className="get-started-content">
        <div className="get-started-main flex  justify-between align-items-top flex-column">
          <h1>Analyze your personal energy data</h1>
          <p>
            Myenergy.ai is an opensource tool that democratizes the analysis of
            personal energy data through 4 simple steps.
          </p>
        </div>
        <div className="user-steps-info flex">
          <div className="user-steps-container flex flex-column justify-between">
            <div className="user-step flex">
              <Button className="steps-info-btn" type="primary" shape="circle">
                1
              </Button>
              <p>Upload Travel Data</p>
            </div>
            <div className="user-step flex">
              <Button className="steps-info-btn" type="primary" shape="circle">
                3
              </Button>
              <p>Set Work Hours</p>
            </div>
          </div>
          <div className="user-steps-container flex flex-column justify-between">
            <div className="user-step flex">
              <Button className="steps-info-btn" type="primary" shape="circle">
                2
              </Button>
              <p>Adjust Carbon Costs</p>
            </div>
            <div className="user-step flex">
              <Button className="steps-info-btn" type="primary" shape="circle">
                4
              </Button>
              <p>Visualize Data</p>
            </div>
          </div>
        </div>
        <div className="get-started-button-box">
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
  );
};

export default GetStarted;
