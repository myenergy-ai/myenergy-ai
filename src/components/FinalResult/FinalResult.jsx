import "./FinalResult.css";
import { Table, Modal, Button } from "antd";
import { useSelector } from "react-redux";
import {
  selectLocationData,
  setDataToMap,
} from "../../redux/reducers/dataSlice";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import { selectCarbonCost } from "../../redux/reducers/carbonCostSlice";
import {
  selectIncludeAllHoursAndDays,
  selectWorkingHours,
} from "../../redux/reducers/workingHoursSlice";
import { useEffect, useState } from "react";
import {
  MAP_RESULTS_STEP,
  WORKING_HOURS_STEP,
} from "../../constants/stepConstants";
import {
  finalResultCarbonCostTableColumns,
  finalResultTravelModeTableColumns,
} from "../../constants/tableColumnsInfo";
import downloadFile from "../../lib/downloadFinalResult";
import splitDataIntoModeOfCategories from "../../lib/splitDataIntoCategories";

const FinalResult = () => {
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState(true);
  const [carbonCostFinalData, setCarbonCostFinalData] = useState([]);

  const finalResultTableColumns = finalResultCarbonCostTableColumns;
  const costPerModeTableColumns = finalResultTravelModeTableColumns;

  const carbonCostData = useSelector(selectCarbonCost);
  const workingHours = useSelector(selectWorkingHours);
  const locationData = useSelector(selectLocationData);
  const includeAllHoursAndDays = useSelector(selectIncludeAllHoursAndDays);

  const totalCost = carbonCostFinalData
    ?.reduce((prev, curr) => prev + curr.carbonCost, 0)
    .toFixed(2);

  const moveToPreviousStep = () => {
    dispatch(setDataToMap(null));
    dispatch(setCurrentStep(WORKING_HOURS_STEP));
  };

  const moveToMap = () => {
    dispatch(setCurrentStep(MAP_RESULTS_STEP));
  };

  useEffect(() => {
    const updateCarbonCostForEachObject = (
      updatedLocationDataWithCarbonCost
    ) => {
      return updatedLocationDataWithCarbonCost?.map((data) => ({
        ...data,
        carbonCost: data.distance
          ? data.distance *
            carbonCostData.find((item) => item.modeName === data.activityType)
              ?.carbonCost
          : 0,
      }));
    };

    const removeTravelWithNoCarbonEmission = (
      updatedLocationDataWithCarbonCost
    ) => {
      return updatedLocationDataWithCarbonCost.filter(
        (travelData) => travelData.carbonCost > 0
      );
    };

    let updatedLocationDataWithCarbonCost = locationData;

    if (!includeAllHoursAndDays) {
      const daysWithWorkingHours = workingHours.filter(
        (workingHour) => workingHour.workingTime !== ""
      );

      const daysYouHaveWorked = daysWithWorkingHours.map((day) => day.key % 7);

      let hoursYouHaveWorkedForAday = daysWithWorkingHours.map((day) => ({
        key: day.key % 7,
        hour: day.workingTime.split(";").map((times) =>
          times
            .trim()
            .split("-")
            .map((time) => parseInt(time))
        ),
      }));

      const dateRangeYouWantToExclude = workingHours[7].workingTime
        .split(";")
        .map((range) =>
          range
            .trim()
            .split("-")
            .map((date) => new Date(date).getTime())
        );

      updatedLocationDataWithCarbonCost = locationData?.filter((data) => {
        const startDayOfTheTravel = new Date(
          parseInt(data.startTimestamp)
        ).getDay();

        const endDayOfTheTravel = new Date(
          parseInt(data.endTimestamp)
        ).getDay();

        const startTimeOfTheTravel =
          new Date(parseInt(data.startTimestamp)).getHours() * 100 +
          new Date(parseInt(data.startTimestamp)).getMinutes();

        const startDayOfTravelWorkingHours = hoursYouHaveWorkedForAday.find(
          (hour) => hour.key === startDayOfTheTravel
        );

        const endTimeOfTheTravel =
          new Date(parseInt(data.endTimestamp)).getHours() * 100 +
          new Date(parseInt(data.endTimestamp)).getMinutes();

        const endDayOfTravelWorkingHours = hoursYouHaveWorkedForAday.find(
          (hour) => hour.key === endDayOfTheTravel
        );

        let dateInRangeToExclude = false;
        dateRangeYouWantToExclude.forEach((range) => {
          if (
            parseInt(data.startTimestamp) >= range[0] &&
            parseInt(data.endTimestamp) <= range[1] + 86400000
          ) {
            dateInRangeToExclude = true;
            return;
          }
        });

        let isStartTimeInWorkingHourRange = false;
        startDayOfTravelWorkingHours?.hour.forEach((hour) => {
          if (
            hour[0] < startTimeOfTheTravel &&
            hour[1] > startTimeOfTheTravel
          ) {
            isStartTimeInWorkingHourRange = true;
            return;
          }
        });

        let isEndTimeInWorkingHourRange = false;
        endDayOfTravelWorkingHours?.hour.forEach((hour) => {
          if (hour[0] < endTimeOfTheTravel && hour[1] > endTimeOfTheTravel) {
            isEndTimeInWorkingHourRange = true;
            return;
          }
        });

        return (
          daysYouHaveWorked.includes(startDayOfTheTravel) &&
          daysYouHaveWorked.includes(endDayOfTheTravel) &&
          (isStartTimeInWorkingHourRange || isEndTimeInWorkingHourRange) &&
          !dateInRangeToExclude
        );
      });
    }

    updatedLocationDataWithCarbonCost = updateCarbonCostForEachObject(
      updatedLocationDataWithCarbonCost
    );

    updatedLocationDataWithCarbonCost = removeTravelWithNoCarbonEmission(
      updatedLocationDataWithCarbonCost
    );

    const result = splitDataIntoModeOfCategories(
      updatedLocationDataWithCarbonCost
    );

    dispatch(setDataToMap(result));
    setCarbonCostFinalData(updatedLocationDataWithCarbonCost);
    setProcessing(false);
  }, [
    workingHours,
    locationData,
    dispatch,
    carbonCostData,
    includeAllHoursAndDays,
  ]);

  return (
    <>
      <Modal
        title="Preparing result"
        centered
        visible={processing}
        footer={null}
      ></Modal>
      {!processing && (
        <div className="final-result">
          <div className="final-result-container">
            <div className="final-result-header flex flex-column align-center">
              <h2>Your Carbon Footprint</h2>
              <p>
                {!includeAllHoursAndDays && "Work hours set to "}
                {includeAllHoursAndDays
                  ? "Included all data"
                  : workingHours.map((days) => (
                      <span key={days.key}>
                        {days.day +
                          " " +
                          (days.workingTime === ""
                            ? days.key === 8
                              ? "None"
                              : "Holiday"
                            : days.workingTime) +
                          ", "}
                      </span>
                    ))}
                . Click{" "}
                <button
                  className="ant-btn ant-btn-primary"
                  onClick={moveToPreviousStep}
                >
                  Set work hours
                </button>{" "}
                to change
              </p>
            </div>
            <div className="final-result-carbon-cost">
              <Table
                columns={finalResultTableColumns}
                dataSource={carbonCostFinalData}
                bordered
                size="middle"
                scroll={{ x: window.innerWidth * 0.6, y: 400 }}
              />
              <h3>
                Total Carbon Footprint for this time period:{" "}
                <span>{totalCost}kg</span>
              </h3>
            </div>
            <div className="final-result-total-carbon">
              <h3>This set of results uses the Carbon Footprints</h3>
              <Table
                columns={costPerModeTableColumns}
                dataSource={carbonCostData}
                bordered
                size="middle"
                pagination={{ position: ["none", "none"] }}
              />
              <div className="final-result-total-carbon-buttons flex justify-end">
                {carbonCostFinalData.length > 1 && (
                  <Button type="primary" onClick={moveToMap}>
                    Visualize Results
                  </Button>
                )}
                {carbonCostFinalData.length > 1 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      downloadFile(carbonCostFinalData);
                    }}
                  >
                    Download as CSV
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalResult;
