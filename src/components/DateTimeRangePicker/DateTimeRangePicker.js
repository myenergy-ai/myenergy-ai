import React, { useState } from "react";
import { TimePicker, Row, Col, Tooltip, DatePicker } from "antd";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./DateTimeRangePicker.css";

const DateTimeRangePicker = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  type,
  required,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [addNewRange, setAddNewRange] = useState(false);

  const toggleEdit = () => {
    setEditing((prevState) => !prevState);
  };

  const toggleAddNewRange = () => {
    setAddNewRange((prevState) => !prevState);
  };

  // handle close button click
  const onClose = () => {
    setAddNewRange(false);
    toggleEdit();
  };

  /* Utility functions start */
  const convertTimeToMoment = (timeInString) => {
    const hour = timeInString.slice(0, 2);
    const minute = timeInString.slice(2, 4);
    const timeInMoment = moment(`2021-12-21 ${hour}:${minute}`);
    return timeInMoment;
  };

  const convertTimeToString = (timeInMoment) => {
    const hour = timeInMoment.hours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const minute = timeInMoment.minutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const timeInString = hour + minute;
    return timeInString;
  };

  const convertDateToMoment = (dateString) => {
    return moment(dateString);
  };

  const convertDateToString = (dateInMoment) => {
    return dateInMoment.format("YYYY/MM/DD");
  };
  /* Utility functions end */

  // For time-range and date-range
  // stringValues are saved in store
  // picker need moment values
  let stringValues;
  let momentValues;

  // if column type : date-time
  if (type === "date-time") {
    stringValues = record[dataIndex].split(" ; ");
    momentValues = stringValues.map((value) => {
      // if empty string is passed
      if (value.length === 0) {
        return [null, null];
      }

      value = value.split("-");
      let startValue, endValue;
      if (record.key !== 8) {
        // key!==8 => time-picker
        startValue = convertTimeToMoment(value[0]);
        endValue = convertTimeToMoment(value[1]);
      } else {
        // key===8 => date-picker
        startValue = convertDateToMoment(value[0]);
        endValue = convertDateToMoment(value[1]);
      }

      return [startValue, endValue];
    });
  }

  // on updation of existing value
  // 1. get the value in moment
  // 2. convert it to string
  // 3. update in correct sequence (index)
  // 4. save the value
  const updateValue = (value, index) => {
    let updatedValue = [...stringValues];
    let updatedRecord = { ...record };
    let startValue, endValue;

    // value becomes null means
    // user deletes the existing value
    if (value === null) {
      updatedValue.splice(index, 1);
    } else {
      if (record.key !== 8) {
        // key!==8 => time-picker
        startValue = convertTimeToString(value[0]);
        endValue = convertTimeToString(value[1]);
      } else {
        // key===8 => date-picker
        startValue = convertDateToString(value[0]);
        endValue = convertDateToString(value[1]);
      }
      updatedValue[index] = `${startValue}-${endValue}`;
    }

    updatedRecord[dataIndex] = updatedValue.join(" ; ");
    handleSave(updatedRecord);
    toggleEdit();
  };

  // on addition of new value
  // 1. get the value in moment
  // 2. convert it to string
  // 3. push it at the end
  // 4. save the value
  const addNewValue = (value) => {
    let updatedValue = [...stringValues];
    let updatedRecord = { ...record };
    let startValue, endValue;

    if (record.key !== 8) {
      // key!==8 => time-picker
      startValue = convertTimeToString(value[0]);
      endValue = convertTimeToString(value[1]);
    } else {
      // key===8 => date-picker
      startValue = convertDateToString(value[0]);
      endValue = convertDateToString(value[1]);
    }

    updatedValue.push(`${startValue}-${endValue}`);
    updatedRecord[dataIndex] = updatedValue.join(" ; ");
    handleSave(updatedRecord);
    toggleAddNewRange();
    toggleEdit();
  };

  // final node which will be displayed in a cell
  let childNode = children;

  // for editable component toggleEdit on click
  // and show the editors if editing
  if (editable) {
    let editor;
    if (record.key !== 8) {
      // set editor to time picker
      editor = (
        <Col flex={4}>
          {momentValues.map((time, index) => (
            <TimePicker.RangePicker
              key={time.toString()}
              defaultValue={time}
              onChange={(updatedTime) => updateValue(updatedTime, index)}
              format="HH:mm"
            />
          ))}
          {addNewRange && (
            <TimePicker.RangePicker format="HH:mm" onChange={addNewValue} />
          )}
        </Col>
      );
    } else {
      // set editor to date picker
      editor = (
        <Col flex={4}>
          {momentValues.map((date, index) => (
            <DatePicker.RangePicker
              key={date.toString()}
              format="YYYY/MM/DD"
              defaultValue={date}
              onChange={(updatedDate) => updateValue(updatedDate, index)}
            />
          ))}
          {addNewRange && (
            <DatePicker.RangePicker
              format="YYYY/MM/DD"
              onChange={addNewValue}
            />
          )}
        </Col>
      );
    }

    childNode = editing ? (
      <Row wrap={false}>
        {editor}
        <Col flex={1}>
          {addNewRange ? (
            <Tooltip title="Close Time Range" placement="top">
              <MinusSquareOutlined
                className="dateTimeRangePicker__actionIcon"
                onClick={toggleAddNewRange}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Add Time Range" placement="top">
              <PlusSquareOutlined
                className="dateTimeRangePicker__actionIcon"
                onClick={toggleAddNewRange}
              />
            </Tooltip>
          )}

          <Tooltip title="Close Editor" placement="bottom">
            <CloseSquareOutlined
              className="dateTimeRangePicker__actionIcon"
              onClick={onClose}
            />
          </Tooltip>
        </Col>
      </Row>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td>{childNode}</td>;
};

export default DateTimeRangePicker;
