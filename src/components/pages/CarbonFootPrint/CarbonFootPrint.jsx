import React, { useEffect, useState } from "react";
import "./CarbonFootPrint.css";
import { Button, Steps } from "antd";
import ErrorModal from "../../ErrorModal/ErrorModal";
import CarbonCost from "../../CarbonCost/CarbonCost";

const CarbonFootPrint = ({ handleToogle }) => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showHideModal = () => setIsModalVisible(!isModalVisible);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });
  const next = () => {
    setError("");
    if (current >= 0 && current <= 3) setCurrent(current + 1);
  };
  const prev = () => {
    setError("");
    if (current >= 1) setCurrent(current - 1);
  };

  const handleError = () => {
    setCurrent(0);
    setError("error");
    showHideModal();
  };

  const handleStepChange = (e) => {
    console.log(e);
    setCurrent(e);
  };

  return (
    <>
      <ErrorModal
        modalState={isModalVisible}
        handleStateChange={showHideModal}
      />
      <div className="home-page flex justify-center ">
        <div className="steps flex">
          <div className="steps-left">
            <div className="user-steps-box  flex justify-center align-center">
              <Steps
                current={current}
                className="user-steps flex justify-center"
                direction={width <= 1200 ? "horizontal" : "vertical"}
                onChange={handleStepChange}
                status={error}
              >
                <Step title="Upload" />
                <Step title="Adjust Cost" />
                <Step title="Define Routines" />
                <Step title="Download Data" />
              </Steps>
            </div>
          </div>
          <div className="steps-right ">
            {/* flex justify-evenly align-center */}
            {/* <Button onClick={next} type="primary">
              Next
            </Button>
            <Button onClick={prev} type="primary">
              Prev
            </Button>
            <Button onClick={handleError} type="primary">
              Error
            </Button> */}
            <CarbonCost onCancel={() => prev()} onUpdate={() => next()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
