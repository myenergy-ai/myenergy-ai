import "./Navbar.css";
import logo from "../../assets/logo5.jpeg";
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
        <div className="navbar-main flex justify-between align-items">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="navbar-logo"
            alt="logo"
          />
          <div>
            <QuestionCircleOutlined
              className="navbar-help flex"
              onClick={handleOpenHelp}
            />
            <a
              href="https://github.com/myenergy-ai/myenergy-ai"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined className="navbar-github flex" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
