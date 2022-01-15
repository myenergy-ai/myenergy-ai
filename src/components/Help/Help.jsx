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
      visible={isVisible}
      onCancel={handleCloseHelp}
      centered
      width={window.innerWidth * 0.75}
      footer={[]}
    >
      <div className="help-container">
        <h2>Help</h2>
        <div className="help-brief">
          <p>
            Please note that this service is designed to be extremely secure.
            Therefore, to protect your privacy, no data is held outside your own
            web browser and nothing is uploaded to our servers. However, be
            warned that this does mean that if you refresh the page at any time,
            you will have to start again. So, please let the tool finish the job
            it is working on if you want to download your data.
          </p>
        </div>

        <div className="help-brief">
          <h3>Follow these steps to get your tarvel data:</h3>
          <div className="help-steps-sources">
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
            </ul>
          </div>
          <p>
            <strong>Note:</strong> In the downloaded <strong>Takeout</strong>{" "}
            folder, user needs to go to <strong>Location History</strong>{" "}
            folder, then to <strong>Semantic Location History</strong> folder.
            Now this folder consists of year wise location history of the user.
            Each year folder has the monthly location history data in json
            format. User can upload single or multiple json files.
          </p>
        </div>
        <div className="help-steps">
          <p>
            <span>Upload travel data:</span> allows you to upload your travel
            data for Carbon Cost calculation. It accepts Google location
            history, Waze History and Apple Location history. If it cannot work
            out how to format data it will tell you. You can upload multiple
            files - they will be merged into one large file. The system will
            attempt to merge duplicate data where it can. The system will
            estimate how long the calculation will take, if it is too long,
            cancel and try to split up the file before you upload it. You can
            get your travel data following these steps:
          </p>
        </div>
        <div className="help-steps">
          <p>
            <span>Adjust Carbon Cost:</span> allows you to change the Carbon
            Cost Calculation or reset to default.
          </p>
        </div>
        <div className="help-steps">
          <p>
            <span>Set Work Hours:</span> allows you to change the work hours for
            each you want the system to calculate your Carbon Cost.
          </p>
        </div>
        <div className="help-steps">
          <p>
            <span>Visualize Data:</span> allows you to download the results of
            the current calculation.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Help;
