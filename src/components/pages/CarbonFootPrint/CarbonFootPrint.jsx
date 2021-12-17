import { useState } from "react";
import "./CarbonFootPrint.css";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import InputModal from "../../inputModal/InputModal";
import ErrorModal from "../../ErrorModal/ErrorModal";
import CarbonCost from "../../CarbonCost/CarbonCost";

const CarbonFootPrint = () => {
  const [current, setCurrent] = useState(0);
  //const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showHideModal = () => setIsModalVisible(!isModalVisible);

  const next = () => {
    //setError("");
    if (current >= 0 && current <= 3) setCurrent(current + 1);
  };
  const prev = () => {
    //setError("");
    if (current >= 1) setCurrent(current - 1);
  };

  // const handleError = () => {
  //   setCurrent(0);
  //   setError("error");
  //   showHideModal();
  // };

//   const handleStepChange = (e) => {
//     console.log(e);
//     setCurrent(e);
//   };
  
  return (
    <>
      <ErrorModal
        modalState={isModalVisible}
        handleStateChange={showHideModal}
      />
      <div className="carbon-foot-print flex">
        <StepsSidebar />
        <div className="carbon-foot-print-main flex justify-evenly align-center">
          <InputModal />
          <CarbonCost onCancel={() => prev()} onUpdate={() => next()} />
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
