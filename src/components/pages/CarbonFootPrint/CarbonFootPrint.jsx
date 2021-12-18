import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import InputModal from "../../InputModal/InputModal";
import { useSelector } from "react-redux";
import { selectCurrentStep } from "../../../redux/reducers/appSlice";
import FinalResult from "../../FinalResult/FinalResult";
import { useDispatch, useSelector } from "react-redux";
import "./CarbonFootPrint.css";
import ErrorModal from "../../ErrorModal/ErrorModal";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import CarbonCost from "../../CarbonCost/CarbonCost";
import WorkHours from "../../WorkHours/WorkHours";
import {
  selectModalVisisbility,
  setModalVisibility,
} from "../../../redux/reducers/appSlice";

const CarbonFootPrint = () => {
  const currentStep = useSelector(selectCurrentStep);

  return (
    <>
      <ErrorModal />
      <div className="carbon-foot-print flex">
        <StepsSidebar />
        <div className="carbon-foot-print-main flex justify-evenly align-center">
          {currentStep === 0 && <InputModal />}
          {currentStep === 1 && <CarbonCost />}
          {currentStep === 2 && <></>}
          {currentStep === 3 && <FinalResult />}
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
