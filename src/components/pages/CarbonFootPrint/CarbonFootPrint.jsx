import "./CarbonFootPrint.css";

import ErrorModal from "../../ErrorModal/ErrorModal";
import StepsSidebar from "../../StepsSidebar/StepsSidebar";
import { useSelector } from "react-redux";
import InputModal from "../../inputModal/InputModal";
import CarbonCost from "../../CarbonCost/CarbonCost";

const CarbonFootPrint = () => {
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

  // const handleError = () => {
  //   setCurrent(0);
  //   setError("error");
  //   showHideModal();
  // };

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
