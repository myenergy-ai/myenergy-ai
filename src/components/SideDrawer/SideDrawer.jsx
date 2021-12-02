import React, { useState } from "react";
import { Drawer } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./SideDrawer.css";

const SideDrawer = () => {
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => setDrawerState(!drawerState);
  return (
    <>
      <RightOutlined className="arrow" onClick={toggleDrawer} />

      <Drawer
        closeIcon={<LeftOutlined className="arrow arrow-close" />}
        placement="left"
        onClose={toggleDrawer}
        visible={drawerState}
      ></Drawer>
    </>
  );
};

export default SideDrawer;
