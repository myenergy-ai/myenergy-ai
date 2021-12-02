import React from "react";
import GetStarted from "../../GetStarted/GetStarted";
import Navbar from "../../Navbar/Navbar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="home-page flex justify-center ">
        <div className="home-page-main">
          <GetStarted />
        </div>
      </div>
    </>
  );
};

export default HomePage;
