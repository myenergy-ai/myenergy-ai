import React from "react";
import GetStarted from "../../GetStarted/GetStarted";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page flex justify-center align-center">
      <div className="home-page-main">
        <GetStarted />
      </div>
    </div>
  );
};

export default HomePage;
