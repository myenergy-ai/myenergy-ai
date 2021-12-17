import "./CarbonFootPrint.css";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import InputModal from "../../inputModal/InputModal";
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../../../redux/reducers/appSlice";
import FinalResult from "../../FinalResult/FinalResult";
import ErrorModal from "../../ErrorModal/ErrorModal";
import CarbonCost from "../../CarbonCost/CarbonCost";

const CarbonFootPrint = () => {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <>
      <ErrorModal />
      <div className="carbon-foot-print flex">
        <StepsSidebar />
        <div className="carbon-foot-print-main flex justify-evenly align-center">
          {currentStep === 0 && <InputModal />}
          {currentStep === 1 && <></>}
          {currentStep === 2 && <></>}
          {currentStep === 3 && <FinalResult />}
          <InputModal />
          <CarbonCost />
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
