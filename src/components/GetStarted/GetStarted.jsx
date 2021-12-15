import React from "react";
import "./GetStarted.css";
import { Button } from "antd";
import map from "../../assets/map.png";
import { useNavigate } from "react-router";
import ROUTES from "../../routes/routes";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="get-started ">
      <div className="get-started-main flex  justify-between align-items-top">
        <div className="get-started-left flex  justify-between">
          <div className="get-started-left-heading">
            <h1>Hi there!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
            </p>
          </div>
          <img className="get-started-image" src={map} alt="map" />
        </div>
      </div>
      <div className="user-steps-info flex justify-center flex-column align-center">
        <div className="user-steps-container flex align-center justify-center">
          <div className="user-step flex">
            <Button className="steps-info-btn" type="primary" shape="circle">
              1
            </Button>

            <p>Upload</p>
          </div>
          <div className="user-step flex">
            <Button className="steps-info-btn" type="primary" shape="circle">
              2
            </Button>

            <p>Adjust Cost</p>
          </div>
        </div>
        <div className="user-steps-container flex align-center justify-center">
          <div className="user-step flex">
            <Button className="steps-info-btn" type="primary" shape="circle">
              3
            </Button>

            <p>Define Routines</p>
          </div>
          <div className="user-step flex">
            <Button className="steps-info-btn" type="primary" shape="circle">
              4
            </Button>

            <p>Download Data</p>
          </div>
        </div>
      </div>
      <div className="get-started-button-box flex justify-center">
        <Button
          onClick={() => navigate(ROUTES.CARBON_FOOT_PRINT)}
          type="primary"
          className="get-started-button flex justify-center align-center flex-wrap"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;
