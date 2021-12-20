import KeplerGl from "kepler.gl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";
import {
  selectLocationData,
  setLocationData,
} from "../../redux/reducers/dataSlice";
import { setError } from "../../redux/reducers/appSlice";
import "./MapResult.css";
import config from "../../configuration/mapConfig.json";

const MapResult = () => {
  const data = useSelector(selectLocationData);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      /**
       * Data format for the kepler.gl
       */
      const carbonCostData = {
        fields: [
          { name: "key", type: "int" },
          { name: "startLatitude", type: "float" },
          { name: "startLongitude", type: "float" },
          { name: "endLatitude", type: "float" },
          { name: "endLongitude", type: "float" },
          { name: "startTimestamp", type: "time" },
          { name: "endTimestamp", type: "time" },
          { name: "distance", type: "int" },
          { name: "activityType", type: "string" },
          { name: "activityConfidence", type: "string" },
          { name: "activityProbability", type: "float" },
          { name: "carbonCost", type: "int" },
        ],
        rows: data.map((row) => Object.values(row)),
      };

      /**
       * Adding data to kepler.gl map.
       */
      dispatch(
        addDataToMap({
          datasets: {
            info: {
              label: "Carbon Cost",
              id: "carbon-cost",
            },
            data: carbonCostData,
          },
          option: {
            centerMap: true,
          },
          config: config,
        })
      );
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLocationData(null));
    }
  }, [dispatch, data]);

  return (
    <div className="map-result">
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