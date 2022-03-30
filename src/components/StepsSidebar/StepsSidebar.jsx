import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCurrentStep,
  selectError,
  setCurrentStep,
} from "../../redux/reducers/appSlice";
import { Steps } from "antd";
import "./StepsSidebar.css";
import { useEffect, useState } from "react";

const StepsSidebar = () => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(window.innerWidth);

  const { Step } = Steps;

  const current = useSelector(selectCurrentStep);
  const error = useSelector(selectError);

  const handleChange = (e) => {
    dispatch(setCurrentStep(e));
  };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="stepsSidebar steps-left">
      <div className="stepsSidebar__userStepsBox  flex justify-center align-center">
        <Steps
          current={current}
          className="stepsSidebar__userSteps flex justify-center"
          direction={width <= 1024 ? "horizontal" : "vertical"}
          onChange={handleChange}
          status={error}
        >
          <Step disabled title="Upload travel data" />
          <Step disabled title="Adjust carbon footprints" />
          <Step disabled title="Set work hours" />
          <Step disabled title="Your results" />
        </Steps>
      </div>
    </div>
  );
};

export default StepsSidebar;
