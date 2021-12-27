import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../../../redux/reducers/appSlice";
import FinalResult from "../../FinalResult/FinalResult";
import "./CarbonFootPrint.css";
import ErrorModal from "../../ErrorModal/ErrorModal";
import CarbonCost from "../../CarbonCost/CarbonCost";
import WorkHours from "../../WorkHours/WorkHours";
import InputModal from "../../inputModal/InputModal";
import MapResult from "../../MapResult/MapResult";

const CarbonFootPrint = () => {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <>
      <ErrorModal />
      <div className="carbon-foot-print flex">
        {currentStep < 4 && <StepsSidebar />}
        <div className="carbon-foot-print-main flex justify-evenly align-center">
          {currentStep === 0 && <InputModal />}
          {currentStep === 1 && <CarbonCost />}
          {currentStep === 2 && <WorkHours />}
          {currentStep === 3 && <FinalResult />}
          {currentStep === 4 && <MapResult />}
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
