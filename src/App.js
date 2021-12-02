import React from "react";
import "./app.css";
import { Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import HomePage from "./components/pages/HomePage/HomePage";
import CarbonFootPrint from "./components/pages/CarbonFootPrint/CarbonFootPrint";
import ROUTES from "./routes/routes";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path={ROUTES.HOME} element={<HomePage />} />
        <Route
          exact
          path={ROUTES.CARBON_FOOT_PRINT}
          element={<CarbonFootPrint />}
        />
      </Routes>
    </div>
  );
}

export default App;
