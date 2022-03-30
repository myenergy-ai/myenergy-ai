import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import "./CarbonCost.css";
import {
  EditableCell,
  EditableRow,
} from "../EditableComponents/EditableComponents";
import {
  updateTravelMode,
  resetCarbonCosts,
  selectCarbonCost,
  removeCarbonCosts,
} from "../../redux/reducers/carbonCostSlice";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import {
  LOCATION_DATA_STEP,
  WORKING_HOURS_STEP,
} from "../../constants/stepConstants";
import { carbonCostTableColumns } from "../../constants/tableColumnsInfo";
import { resetLocationData } from "../../redux/reducers/dataSlice";

const CarbonCost = () => {
  const dispatch = useDispatch();
  const carbonCosts = useSelector(selectCarbonCost);

  const componentForEachCellInTable = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const saveDataAfterUpdatingCellValue = (row) => {
    dispatch(updateTravelMode(row));
  };

  const resetDataToDefaultValue = () => {
    dispatch(resetCarbonCosts());
  };

  const columnsOfTheTable = carbonCostTableColumns.map((column) => ({
    ...column,
    onCell: (record) => ({
      record,
      editable: column.editable,
      dataIndex: column.dataIndex,
      title: column.title,
      type: column.type,
      handleSave: saveDataAfterUpdatingCellValue,
    }),
  }));

  const cancelAndPrevious = () => {
    dispatch(removeCarbonCosts());
    dispatch(resetLocationData());
    dispatch(setCurrentStep(LOCATION_DATA_STEP));
  };

  const saveAndNext = () => {
    dispatch(setCurrentStep(WORKING_HOURS_STEP));
  };

  return (
    <div className="carbonCost__container flex flex-column">
      <div>
        <h2 className="carbonCost__heading">
          Adjust the carbon intensity of different modes of travel
        </h2>
        <p className="carbonCost__heading">
          These are the modes of travel in your Google takeout. We've assigned a
          carbon intensity to each mode of travel using internationally
          recognised standards. We use these to estimate the total amount of
          carbon produced by every kilometer you've travelled. If you want to
          assign your own carbon intensity, just tap on a value to change it.
          [below the table] A word on embeded emissions: Almost every mode of
          travel produces carbon emissions. Even a bicycle has a carbon
          footprint to build it - these are called embeded emissions. In this
          tool we don't calculate embeded emisisons; we've just focussed on the
          emissions produced while travelling.
        </p>
      </div>
      <div className="carbonCost__table">
        <Table
          size="small"
          bordered
          components={componentForEachCellInTable}
          columns={columnsOfTheTable}
          dataSource={carbonCosts}
          pagination={false}
          scroll={{ y: window.innerHeight * 0.4 }}
        />
      </div>
      <div className="carbonCost__actions flex justify-end flex-wrap">
        <Button type="primary" onClick={resetDataToDefaultValue}>
          Reset to default
        </Button>
        <Button type="primary" onClick={cancelAndPrevious}>
          Cancel
        </Button>
        <Button type="primary" onClick={saveAndNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CarbonCost;
