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
  const dispatch = useDispatch();

  const isModalVisible = useSelector(selectModalVisisbility);

  const showHideModal = () => {
    dispatch(setModalVisibility(!isModalVisible));
  };

  return (
    <>
      <ErrorModal
        modalState={isModalVisible}
        handleStateChange={showHideModal}
      />
      <div className="carbon-foot-print flex">
        <StepsSidebar />
        <div className="carbon-foot-print-main flex justify-evenly align-center">
          {/* 
            Render component by checking current-step
            Step 1: Upload
            Step 2: CarbonCost
            Step 3: WorkHours
            Step 4: Download
          */}
          <CarbonCost />
          {/* <WorkHours /> */}
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;