import "./Navbar.css";
import logo from "../../assets/ai_long logo_green.svg";
import { useNavigate } from "react-router";
import { QuestionCircleOutlined, GithubOutlined } from "@ant-design/icons";
import Help from "../Help/Help";
import { useDispatch } from "react-redux";
import { setHelpModalVisisbility } from "../../redux/reducers/appSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenHelp = () => {
    dispatch(setHelpModalVisisbility(true));
  };

  return (
    <>
      <Help />
      <nav className="navbar flex justify-center align-center">
        <div className="navbar__main flex justify-between align-items">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="navbar__logo"
            alt="logo"
          />
          <div className="flex">
            <QuestionCircleOutlined
              className="navbar__help flex"
              onClick={handleOpenHelp}
            />
            <a
              href="https://github.com/myenergy-ai/myenergy-ai"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined className="navbar__github flex" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
