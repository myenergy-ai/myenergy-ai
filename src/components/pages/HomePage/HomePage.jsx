import React from "react";
import GetStarted from "../../GetStarted/GetStarted";
import "./HomePage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  setError,
  setHelpModalVisibility,
} from "../../../redux/reducers/appSlice";
import { resetAllStates } from "../../../lib/resetAllStates";
import { LOCATION_DATA_STEP } from "../../../constants/stepConstants";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    resetAllStates();
    dispatch(setHelpModalVisibility(false));
    dispatch(setError(""));
    dispatch(setCurrentStep(LOCATION_DATA_STEP));
  }, [dispatch]);

  return (
    <div className="homePage flex justify-center align-center">
      <div className="homePage__main">
        <GetStarted />
      </div>
    </div>
  );
};

export default HomePage;
