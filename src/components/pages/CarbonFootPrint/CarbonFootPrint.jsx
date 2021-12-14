import "./CarbonFootPrint.css";
import ErrorModal from "../../ErrorModal/ErrorModal";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import { useDispatch } from "react-redux";
import {
  selectModalVisisbility,
  setModalVisibility,
} from "../../../redux/reducers/appSlice";
import { useSelector } from "react-redux";
import InputModal from "../../inputModal/InputModal";

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
          <InputModal />
        </div>
      </div>
    </>
  );
};

export default CarbonFootPrint;
