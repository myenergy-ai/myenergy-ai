import React from "react";
import GetStarted from "../../GetStarted/GetStarted";
import "./HomePage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCurrentStep,
  setError,
  setHelpModalVisisbility,
} from "../../../redux/reducers/appSlice";
import { resetAllStates } from "../../../lib/resetAllStates";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    resetAllStates();
    dispatch(setHelpModalVisisbility(false));
    dispatch(setError(""));
    dispatch(setCurrentStep(0));
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
