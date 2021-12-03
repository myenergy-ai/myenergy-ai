import React, { useState } from "react";
import "./CarbonFootPrint.css";
import { Button, Steps } from "antd";
import Navbar from "../../Navbar/Navbar";

const CarbonFootPrint = ({ handleToogle }) => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const next = () => {
    if (current >= 0 && current < 3) setCurrent(current + 1);
  };
  const prev = () => {
    if (current >= 1) setCurrent(current - 1);
  };

  return (
    <>
      <Navbar withBackIcon />
      <div className="home-page flex justify-center ">
        <div className="steps flex">
          <div className="steps-left">
            <div className="user-steps-box  flex justify-center align-center">
              <Steps
                current={current}
                className="user-steps flex justify-center"
                direction="vertical"
                onChange={(e) => setCurrent(e)}
              >
                <Step title="Upload" />
                <Step title="Adjust Cost" />
                <Step title="Define Routines" />
                <Step title="Download Data" />
              </Steps>
            </div>
          </div>
          <div className="steps-right">
            <Button onClick={prev} type="primary">
              back
            </Button>

            <Button onClick={next} type="primary">
              next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
