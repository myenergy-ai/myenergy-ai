import React from "react";
import GetStarted from "../../GetStarted/GetStarted";
import "./HomePage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCarbonCosts } from "../../../redux/reducers/carbonCostSlice";
import {
  setDataToMap,
  setLocationData,
} from "../../../redux/reducers/dataSlice";
import { resetWorkingHours } from "../../../redux/reducers/workingHoursSlice";
import {
  setCurrentStep,
  setError,
  setHelpModalVisisbility,
} from "../../../redux/reducers/appSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLocationData(null));
    dispatch(setDataToMap(null));
    dispatch(resetCarbonCosts());
    dispatch(resetWorkingHours());
    dispatch(setHelpModalVisisbility(false));
    dispatch(setError(""));
    dispatch(setCurrentStep(0));
  }, [dispatch]);
  return (
    <div className="home-page flex justify-center ">
      <div className="home-page-main">
        <GetStarted />
      </div>
    </div>
  );
};

export default HomePage;
