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
} from "../../redux/reducers/carbonCostSlice";
import { setCurrentStep } from "../../redux/reducers/appSlice";
import {
  LOCATION_DATA_STEP,
  WORKING_HOURS_STEP,
} from "../../constants/stepConstants";
import { carbonCostTableColumns } from "../../constants/tableColumnsInfo";

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
    const element = document.getElementsByClassName("ant-table-row");
    element[0].scrollIntoView({
      behavior: "smooth",
    });
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
    dispatch(resetCarbonCosts());
    dispatch(setCurrentStep(LOCATION_DATA_STEP));
  };

  const saveAndNext = () => {
    dispatch(setCurrentStep(WORKING_HOURS_STEP));
  };

  return (
    <div className="carbon-cost-container">
      <div className="carbon-cost-top">
        <h2 className="carbon-cost-heading">Adjust Carbon Footprint</h2>
        <p className="carbon-cost-info">
          Carbon footprint by travel is the total amount of greenhouse gases
          (including carbon dioxide and methane) that are generated by travel.
          The below figures approximate how much carbon is emitted per travel
          mode. These carbon footprint figures may change geographically - you
          may change them if you are aware of the carbon footprint in your
          location.
        </p>
      </div>
      <div className="carbon-cost-table">
        <Table
          size="small"
          bordered
          components={componentForEachCellInTable}
          columns={columnsOfTheTable}
          dataSource={carbonCosts}
          pagination={false}
          scroll={{ y: window.innerHeight * 0.5 }}
        />
      </div>
      <div className="carbon-cost-actions">
        <Button type="primary" onClick={resetDataToDefaultValue}>
          Reset to default
        </Button>
        <Button type="primary" onClick={cancelAndPrevious}>
          Cancel
        </Button>
        <Button type="primary" onClick={saveAndNext}>
          Save & Next
        </Button>
      </div>
    </div>
  );
};

export default CarbonCost;
