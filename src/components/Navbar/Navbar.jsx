import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo5.jpeg";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const Navbar = ({ withBackIcon }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar flex justify-center align-center">
      <div className="navbar-main flex justify-between align-items">
        <img src={logo} className="navbar-logo" alt="logo" />

        {withBackIcon && (
          <RollbackOutlined
            onClick={() => navigate("/")}
            className="navbar-back-icon"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
