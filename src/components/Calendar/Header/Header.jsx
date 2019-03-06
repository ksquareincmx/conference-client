import React from "react";
import "./Header.css";
import { ModalFormConsumer } from "../../../providers/ModalForm";

const styles = {
  firstButton: {
    borderRadius: "20px 0px 0px 20px"
  },
  secondButton: {
    borderRadius: "0px 20px 20px 0px"
  }
};

const HeaderView = props => {
  return (
    <div className="header-container">
      <div className="header-view-selector">
        <div className="veiew-buttons-container">
          <button
            className="view-selector-button"
            onClick={props.onClickViewButton("day")}
            style={styles.firstButton}
          >
            Day
          </button>
          <button
            className="view-selector-button"
            onClick={props.onClickViewButton("work_week")}
          >
            Week
          </button>
          <button
            className="view-selector-button"
            onClick={props.onClickViewButton("month")}
          >
            Month
          </button>
          <button
            className="view-selector-button"
            onClick={props.onClickViewButton("year")}
            style={styles.secondButton}
          >
            Year
          </button>
        </div>
      </div>
      <div className="header-bottom-side">
        {props.headerDateContainer}
        <div className="header-bottom-side-separator"> </div>
        <div className="header-create-meeting">
          <ModalFormConsumer>
            {modalForm => (
              <button
                className="create-meating-button"
                onClick={modalForm.handleOnClickCreateMeeting}
              >
                CREATE MEETING
              </button>
            )}
          </ModalFormConsumer>
        </div>
      </div>
    </div>
  );
};

export default HeaderView;
