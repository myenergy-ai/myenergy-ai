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
    <div className="steps-sidebar steps-left">
      <div className="user-steps-box  flex justify-center align-center">
        <Steps
          current={current}
          className="user-steps flex justify-center"
          direction={width <= 1024 ? "horizontal" : "vertical"}
          onChange={handleChange}
          status={error}
        >
          <Step disabled title="Upload Travel Data" />
          <Step disabled title="Adjust Cost Cost" />
          <Step disabled title="Set work hours" />
          <Step disabled title="Download results" />
        </Steps>
      </div>
    </div>
  );
};

export default StepsSidebar;
