import { PanelHeaderFactory } from "kepler.gl/components";
import logo from "../../assets/ai_long logo_green.svg";
import { useNavigate } from "react-router";
import "./MapResult.css";

export const CustomPanelHeaderFactory = () => {
  const PanelHeader = PanelHeaderFactory();

  PanelHeader.defaultProps = {
    ...PanelHeader.defaultProps,
    logoComponent: LogoComponent,
  };
  return PanelHeader;
};

const LogoComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="logoContainer">
      <img
        loading="lazy"
        onClick={() => navigate("/")}
        src={logo}
        className="logoContainer__logo"
        alt=""
      />
    </div>
  );
};
