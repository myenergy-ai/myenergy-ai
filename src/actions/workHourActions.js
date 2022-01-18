import store from "../redux/store";
import { addKeysToObjects } from "./utils";
import moment from "moment";
import {
  addCustomWorkingHours,
  updateWorkingTime,
} from "../redux/reducers/workingHoursSlice";
import { INVALID_SCHEMA_ERROR } from "./utils";

function isKeyValid(workingHour) {
  const requiredKeys = ["day", "workingTime"];
  const providedKeys = Object.keys(workingHour);
  return (
    requiredKeys.length === providedKeys.length &&
    requiredKeys
      .slice()
      .sort()
      .every(function (value, index) {
        return value === providedKeys[index];
      })
  );
}

function isTypeValid(workingHour) {
  if (
    typeof workingHour.day === "string" &&
    typeof workingHour.workingTime === "string"
  ) {
    return true;
  }
  return false;
}

function isDayValid(day) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (days.includes(day)) {
    return true;
  }
  return false;
}

function isTimeValid(time) {
  const hour = Number(time.slice(0, 2));
  const minute = Number(time.slice(2, 4));
  if (isFinite(hour) && isFinite(minute)) {
    if (0 <= hour && hour <= 23 && 0 <= minute && minute <= 59) {
      return true;
    }
  }
  return false;
}

function isTimeRangeValid(timeRange) {
  if (!timeRange) return true;
  const timeRangeArray = timeRange.split("-");
  return isTimeValid(timeRangeArray[0]) && isTimeValid(timeRangeArray[1]);
}

function isTimeStringValid(timeString) {
  const times = timeString.split(" ; ");
  for (let timeRange of times) {
    if (!isTimeRangeValid(timeRange)) {
      return false;
    }
  }
  return true;
}

function isDateValid(date) {
  const format = "YYYY/MM/DD";
  console.log(date, format, moment(date, format, true).isValid());
  return moment(date, format, true).isValid();
}

function isDateRangeValid(dateRange) {
  if (!dateRange) return true;
  const dateRangeArray = dateRange.split("-");
  return isDateValid(dateRangeArray[0]) && isDateValid(dateRangeArray[1]);
}

function isDateStringValid(dateString) {
  const dates = dateString.split(" ; ");
  for (let dateRange of dates) {
    if (!isDateRangeValid(dateRange)) {
      return false;
    }
  }
  return true;
}

function isValueValid(workingHour) {
  if (isTypeValid(workingHour)) {
    if (isDayValid(workingHour.day)) {
      if (isTimeStringValid(workingHour.workingTime)) {
        return true;
      }
    } else if (workingHour.day === "Exclude_Dates") {
      if (isDateStringValid(workingHour.workingTime)) {
        return true;
      }
    }
  }
  return false;
}

function isWorkingHourValid(workingHour) {
  const keyIsValid = isKeyValid(workingHour);
  const valueIsValid = isValueValid(workingHour);
  // console.log(keyIsValid, valueIsValid);
  return keyIsValid && valueIsValid;
}

function isWorkingHoursValid(workingHours) {
  for (let workingHour of workingHours) {
    if (!isWorkingHourValid(workingHour)) {
      return false;
    }
  }
  return true;
}

/**
 * @description Validates and adds the working hours provided by the user
 * @param {Array of Objects} workingHours : list of objects containing day and workingHour
 * @returns {
 *  true: if workingHours schema is valid and working hours are succesfully added,
 *  INVALID_SCHEMA_ERROR: if workingHours schema is not valid
 * }
 */
export const setWorkingHours = (workingHours) => {
  if (isWorkingHoursValid(workingHours)) {
    const generatedWorkingHours = addKeysToObjects(workingHours);
    store.dispatch(addCustomWorkingHours(generatedWorkingHours));
    return true;
  }
  throw INVALID_SCHEMA_ERROR;
};

/**
 * @description Updates the existing working hour
 * @param {Object} updatedWorkingHour : object containing day and workingHour
 * @returns {
 *  true: if param is valid and wokring hour is succesfully updated
 *  INVALID_SCHEMA_ERROR: if updatedWorkingHour schema is not valid
 * }
 */
export const updateWorkingHour = (updatedWorkingHour) => {
  if (isWorkingHourValid(updatedWorkingHour)) {
    store.dispatch(updateWorkingTime(updatedWorkingHour));
    return true;
  }
  throw INVALID_SCHEMA_ERROR;
};

/**
 * @description Getter method for working hour
 * @returns {Array Of Objects} : List of working hours
 */
export const getWorkingHours = () => {
  const currState = store.getState();
  return currState.workingHours.workingTimes;
};

// sample data for testing
export const sampleWorkingHours = [
  {
    day: "Monday",
    workingTime: "0900-1700 ; 1800-2000",
  },
  {
    day: "Tuesday",
    workingTime: "0900-2000",
  },
  {
    day: "Wednesday",
    workingTime: "0900-1700",
  },
  {
    day: "Thursday",
    workingTime: "0900-1700",
  },
  {
    day: "Friday",
    workingTime: "0900-1700",
  },
  {
    day: "Saturday",
    workingTime: "",
  },
  {
    day: "Sunday",
    workingTime: "",
  },
  {
    day: "Exclude_Dates",
    workingTime: "2021/12/02-2021/12/12 ; 2022/01/01-2022/01/10",
  },
];

export const sampleUpdatedWorkingHour = {
  day: "Friday",
  workingTime: "0900-2100",
};
