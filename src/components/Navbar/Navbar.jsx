import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo5.jpeg";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar flex justify-center align-center">
      <div className="navbar-main flex justify-between align-items">
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="navbar-logo"
          alt="logo"
        />
      </div>
    </nav>
  );
};

export default Navbar;
