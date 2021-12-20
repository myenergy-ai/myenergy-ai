import React from "react";
import { Button, Modal } from "antd";
import "./Help.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHelpModalVisisbility,
  setHelpModalVisisbility,
} from "../../redux/reducers/appSlice";

const Help = () => {
  const dispatch = useDispatch();
  const handleOpenHelp = () => {
    dispatch(setHelpModalVisisbility(false));
  };
  const isVisible = useSelector(selectHelpModalVisisbility);
  return (
    <Modal
      visible={isVisible}
      onCancel={handleOpenHelp}
      centered
      width={window.innerWidth * 0.75}
      footer={[
        <Button className="help-close" type="primary" onClick={handleOpenHelp}>
          Close
        </Button>,
      ]}
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
            get your travel data from these services:
          </p>
          <div className="help-steps-sources">
            <p>
              <a
                href="https://takeout.google.com/settings/takeout"
                target="_blank"
                rel="noreferrer"
              >
                Google Takeout
              </a>{" "}
              - after the sign in process, click <i>Deselect All</i>, and then
              select <i>Location History.</i> Will only work if you have
              Location History turned on. Takes a few minutes to be available.
            </p>
            <p>
              <a
                href="https://www.waze.com/dashboard"
                target="_blank"
                rel="noreferrer"
              >
                Waze Download Data Archive
              </a>{" "}
              - only holds the last month's data. If you want data every month,
              set a calender reminder! Takes a few minutes to be available.
            </p>
            <p>
              <a
                href="https://appleid.apple.com/"
                target="_blank"
                rel="noreferrer"
              >
                Apple Data Request
              </a>{" "}
              - after the sign in process, click Request a copy of data &gt;
              Maps. Don't be surprised if it has nothing in it. Takes at least 7
              days to be available.
            </p>
          </div>
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
            <span>Adjust Carbon Cost:</span> allows you to download the results
            of the current calculation.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Help;
