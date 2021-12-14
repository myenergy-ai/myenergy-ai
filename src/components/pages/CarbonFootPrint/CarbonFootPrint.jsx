import "./CarbonFootPrint.css";
import { Button } from "antd";
import ErrorModal from "../../ErrorModal/ErrorModal";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import { useDispatch } from "react-redux";
import {
  selectCurrentStep,
  selectModalVisisbility,
  setCurrentStep,
  setError,
  setModalVisibility,
} from "../../../redux/reducers/appSlice";
import { useSelector } from "react-redux";

const CarbonFootPrint = () => {
  const dispatch = useDispatch();

  const current = useSelector(selectCurrentStep);

  const isModalVisible = useSelector(selectModalVisisbility);

  const showHideModal = () => {
    dispatch(setModalVisibility(!isModalVisible));
  };

  const next = () => {
    dispatch(setError(""));
    if (current >= 0 && current <= 3) {
      dispatch(setCurrentStep(current + 1));
    }
  };

  const prev = () => {
    dispatch(setError(""));
    if (current >= 1) {
      dispatch(setCurrentStep(current - 1));
    }
  };

  const handleError = () => {
    dispatch(setCurrentStep(0));
    dispatch(setError("error"));
    showHideModal();
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
          <Button onClick={next} type="primary">
            Next
          </Button>
          <Button onClick={prev} type="primary">
            Prev
          </Button>
          <Button onClick={handleError} type="primary">
            Error
          </Button>
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
