import React, { useState } from "react";
import { Table, Button } from "antd";
import "./CarbonCost.css";
import {
  EditableCell,
  EditableRow,
} from "./EditableComponents/EditableComponents";

import { initialCarbonCosts, headers } from "./initialState";

const CarbonCost = (props) => {
  const [carbonCosts, setCarbonCosts] = useState(initialCarbonCosts);

  console.log(carbonCosts);

  const handleSave = (row) => {
    row.carbonCost = Number(row.carbonCost);
    const newData = [...carbonCosts];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setCarbonCosts(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = headers.map((header) => ({
    ...header,
    onCell: (record) => ({
      record,
      editable: header.editable,
      dataIndex: header.dataIndex,
      title: header.title,
      handleSave,
    }),
  }));

  const handleAddNewTravelMode = () => {
    const currKey = carbonCosts.length + 1;
    const newTravelMode = {
      key: currKey,
      travelMode: "New Travel Mode",
      carbonCost: 0,
    };
    setCarbonCosts((currCarbonCosts) => [...currCarbonCosts, newTravelMode]);
  };

  const handleReset = () => {
    setCarbonCosts(initialCarbonCosts);
  }

  return (
    <div className="carbon-cost-container">
      <div className="carbon-cost-top">
        <h2 className="carbon-cost-heading">Adjust Carbon Cost</h2>
        <p className="carbon-cost-info">
          Carbon cost is in kg per person per km travelled.
        </p>
        <p className="carbon-cost-info">
          Please make sure you know what you are doing before you adjust these
          figures!
        </p>
      </div>
      <div className="carbon-cost-table">
        <Table
          size="small"
          bordered
          components={components}
          columns={columns}
          dataSource={carbonCosts}
          pagination={false}
        />
      </div>
      <div className="carbon-cost-actions">
        <Button type="primary" onClick={handleAddNewTravelMode}>
          Add new travel mode
        </Button>
        <Button type="primary" onClick={handleReset}>Reset to default</Button>
        <Button type="primary" onClick={props.onCancel}>Cancel</Button>
        <Button type="primary" onClick={props.onUpdate}>Update costs</Button>
      </div>
    </div>
  );
};

export default CarbonCost;
