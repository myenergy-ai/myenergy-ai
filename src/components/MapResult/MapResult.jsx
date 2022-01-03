import KeplerGl from "kepler.gl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";
import { selectDataToMap, setDataToMap } from "../../redux/reducers/dataSlice";
import { setCurrentStep, setError } from "../../redux/reducers/appSlice";
import "./MapResult.css";
import { Button } from "antd";
import { selectCarbonCost } from "../../redux/reducers/carbonCostSlice";
import { FINAL_RESULT_STEP } from "../../constants/stepConstants";
import { mapResultDataFields } from "../../constants/tableColumnsInfo";
import {
  createDataSetBasedOnModeOfTransport,
  createLayersBasedOnModeOfTransport,
} from "../../lib/createLayers";

const MapResult = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectDataToMap);
  const carbonCost = useSelector(selectCarbonCost);

  useEffect(() => {
    try {
      const carbonCostData = Object.keys(data).map((mode) => ({
        fields: mapResultDataFields,
        rows: data[mode].map((row) => Object.values(row)),
      }));

      dispatch(
        addDataToMap({
          datasets: createDataSetBasedOnModeOfTransport(
            data,
            carbonCostData,
            carbonCost
          ),
          option: {
            centerMap: true,
          },
          config: {
            version: "v1",
            config: {
              visState: {
                layers: createLayersBasedOnModeOfTransport(data, carbonCost),
              },
            },
          },
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setDataToMap(null));
    }
  }, [dispatch, data, carbonCost]);

  return (
    <div className="map-result">
      <Button
        ghost
        className="map-result-back-button"
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
