import React from "react";
import { Modal } from "antd";
import "./Help.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHelpModalVisisbility,
  setHelpModalVisisbility,
} from "../../redux/reducers/appSlice";

const Help = () => {
  const dispatch = useDispatch();
  const handleCloseHelp = () => {
    dispatch(setHelpModalVisisbility(false));
  };
  const isVisible = useSelector(selectHelpModalVisisbility);
  return (
    <Modal
      className="help"
      visible={isVisible}
      onCancel={handleCloseHelp}
      centered
      width={window.innerWidth * 0.75}
      footer={null}
    >
      <div className="help__container">
        <h2>Help</h2>
        <div className="help__brief">
          <p>
            Please note that this service is designed to be extremely secure.
            Therefore, to protect your privacy, no data is held outside your own
            web browser and nothing is uploaded to our servers. However, be
            warned that this does mean that if you refresh the page at any time,
            you will have to start again. So, please let the tool finish the job
            it is working on if you want to download your data.
          </p>
        </div>

        <div className="help__steps">
          <p>
            <span>1. Upload Travel Data:</span> allows you to upload your travel
            data for Carbon Footprint calculation. It accepts Google location
            history. If it cannot work out how to format data it will tell you.
            You can upload multiple files - they will be merged into one large
            file. The system will attempt to merge duplicate data where it can.
            The system will estimate how long the calculation will take, if it
            is too long, cancel and try to split up the file before you upload
            it. You can get your travel data following these steps:
          </p>
          <div className="help__stepsSources">
            <ul>
              <li>
                Go to{" "}
                <a
                  href="https://takeout.google.com/settings/takeout"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Takeout
                </a>
                .
              </li>
              <li>Sign In using your account.</li>
              <li>
                Under create new export, click on <strong>Deselect all</strong>.
              </li>
              <li>
                Then, find the <strong>Location History</strong> option and
                select it.
              </li>
              <li>
                Click on <strong>Next Step</strong> button
              </li>
              <li>
                In this step, you can select the{" "}
                <strong>Delivery Method</strong>, <strong>Frequency</strong>,
                and <strong>File Type</strong>.
              </li>
              <li>
                Finally, click on <strong>Create Export</strong> button.
              </li>
              <li>
                In the downloaded <strong>Takeout</strong> folder, user needs to
                go to <strong>Location History</strong> folder, then to{" "}
                <strong>Semantic Location History</strong> folder.
              </li>
              <li>
                Now this folder consists of year wise location history of the
                user. Each year folder has the monthly location history data in
                json format.
              </li>
              <li>
                User can upload single or multiple json files from these files.
              </li>
            </ul>
            <p>
              <strong>Note: We only support data after 2019</strong>.
            </p>
          </div>
        </div>
        <div className="help__steps">
          <p>
            <span>2. Adjust Carbon Footprint:</span> allows you to change the
            Carbon Footprint Calculation or to reset to default.
          </p>
        </div>
        <div className="help__steps">
          <p>
            <span>3. Set Work Hours:</span> allows you to change the work hours
            for which you want the system to calculate your Carbon Footprint.
          </p>
        </div>
        <div className="help__steps">
          <p>
            <span>4. Visualize Data:</span> allows you to download the results
            of the current calculation or you can visualize it on map.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Help;
