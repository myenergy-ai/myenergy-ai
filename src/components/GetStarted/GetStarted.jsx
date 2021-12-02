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
        <div className="get-started-left flex justify-between flex-column ">
          <div className="get-started-left-heading">
            <h1>Hi there!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
            </p>
          </div>
          <div className="get-started-bottom flex  justify-center align-center flex-column">
            <div className="get-started-bottom-steps flex justify-between flex-wrap">
              <div className="get-started-bottom-step flex  align-center">
                <button className="get-started-bottom-steps-btn">1</button>
                <p>Upload</p>
              </div>
              <div className="get-started-bottom-step flex  align-center">
                <button className="get-started-bottom-steps-btn">2</button>
                <p>Adjust Cost</p>
              </div>
            </div>
            <div className="get-started-bottom-steps flex justify-between flex-wrap">
              <div className="get-started-bottom-step flex  align-center">
                <button className="get-started-bottom-steps-btn">3</button>
                <p>Define Routines</p>
              </div>
              <div className="get-started-bottom-step flex  align-center">
                <button className="get-started-bottom-steps-btn">4</button>
                <p>Download Data</p>
              </div>
            </div>
          </div>
        </div>
        <img className="get-started-image" src={map} alt="map" />
      </div>
      <div className="get-started-button-box flex justify-center">
        <Button
          onClick={() => navigate(ROUTES.CARBON_FOOT_PRINT)}
          type="primary"
          className="get-started-button flex flex-wrap"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;
