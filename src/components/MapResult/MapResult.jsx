import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDataToMap, setDataToMap } from "../../redux/reducers/dataSlice";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import "./MapResult.css";
import { Button } from "antd";
import { selectCarbonCost } from "../../redux/reducers/carbonCostSlice";
import { FINAL_RESULT_STEP } from "../../constants/stepConstants";
import { PanelHeaderFactory, injectComponents } from "kepler.gl/components";
import { CustomPanelHeaderFactory } from "./CustomPanelHeaderFactory";
import { plotDataToMap } from "../../lib/plotDataToMap";

const KeplerGl = injectComponents([
  [PanelHeaderFactory, CustomPanelHeaderFactory],
]);

const MapResult = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectDataToMap);
  const carbonCost = useSelector(selectCarbonCost);

  useEffect(() => {
    try {
      try {
        plotDataToMap(data, carbonCost);
      } catch (error) {
        throw error;
      }
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setDataToMap(null));
    }
  }, [dispatch, data, carbonCost]);

  return (
    <div className="mapResult">
      <Button
        ghost
        className="mapResult__backButton"
        onClick={() => {
          dispatch(setDataToMap(null));
          dispatch(setCurrentStep(FINAL_RESULT_STEP));
        }}
      >
        Go Back
      </Button>
      <KeplerGl
        id="carbonCost"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
        width={window.innerWidth}
        height={window.innerHeight * 0.92}
      />
    </div>
  );
};

export default MapResult;
