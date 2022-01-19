import store from "../redux/store";
import { addKeysToObjects, isKeyValid } from "./utils";
import moment from "moment";
import {
  addCustomWorkingHours,
  updateWorkingTime,
} from "../redux/reducers/workingHoursSlice";
import { INVALID_SCHEMA_ERROR } from "./utils";

/**
 * @description Checks the data type of the values
 * @param {Object} workingHour Object with day and workingTime
 * @returns {Boolean}
 */
function isTypeValid(workingHour) {
  if (
    typeof workingHour.day === "string" &&
    typeof workingHour.workingTime === "string"
  ) {
    return true;
  }
  return false;
}

/**
 * @description Checks for valid day string.
 * @param {String} day
 * @returns {Boolean}
 */
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

/**
 * @description Checks whether the time is in valid format.
 * @param {String} time
 * @returns {Boolean}
 */
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

/**
 * @description Checks whether the time range user provided is valid.
 * @param {String} timeRange
 * @returns {Boolean}
 */
function isTimeRangeValid(timeRange) {
  if (!timeRange) return true;
  const timeRangeArray = timeRange.split("-");
  return isTimeValid(timeRangeArray[0]) && isTimeValid(timeRangeArray[1]);
}

/**
 * @description Checks if the time range string is valid.
 * @param {String} timeString
 * @returns {Boolean}
 */
function isTimeStringValid(timeString) {
  const times = timeString.split(" ; ");
  for (let timeRange of times) {
    if (!isTimeRangeValid(timeRange)) {
      return false;
    }
  }
  return true;
}

/**
 * @description Checks whether the date is in valid format.
 * @param {String} date
 * @returns {Boolean}
 */
function isDateValid(date) {
  const format = "YYYY/MM/DD";
  return moment(date, format, true).isValid();
}

/**
 * @description Checks whether the date range user provided is valid.
 * @param {String} dateRange
 * @returns {Boolean}
 */
function isDateRangeValid(dateRange) {
  if (!dateRange) return true;
  const dateRangeArray = dateRange.split("-");
  return isDateValid(dateRangeArray[0]) && isDateValid(dateRangeArray[1]);
}

/**
 * @description Checks if the date range string is valid.
 * @param {String} dateString
 * @returns {Boolean}
 */
function isDateStringValid(dateString) {
  const dates = dateString.split(" ; ");
  for (let dateRange of dates) {
    if (!isDateRangeValid(dateRange)) {
      return false;
    }
  }
  return true;
}

/**
 * @description Checks whether the workingHour object is valid.
 * @param {Object} workingHour
 * @returns {Boolean}
 */
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

/**
 * @description Check whether the single working hour object is valid.
 * @param {Object} workingHour
 * @returns {Boolean}
 */
function isWorkingHourValid(workingHour) {
  const requiredKeys = ["day", "workingTime"];
  const keyIsValid = isKeyValid(workingHour, requiredKeys);
  const valueIsValid = isValueValid(workingHour);
  return keyIsValid && valueIsValid;
}

/**
 * @description Check whether the whole working hours array is valid.
 * @param {[Object]} workingHours
 * @returns {Boolean}
 */
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
 * @param {[Objects]} workingHours : list of objects containing day and workingHour
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
 * @returns {[Objects]}
 */
export const getWorkingHours = () => {
  const currState = store.getState();
  return currState.workingHours.workingTimes;
};
