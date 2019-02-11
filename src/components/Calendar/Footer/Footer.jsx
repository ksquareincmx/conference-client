import React from "react";
import "./Footer.css";

const FooterView = props => {
  return (
    <div className="footer-container">
      <div className="footer-separator" />
      <div className="time-buttons-container">
        <button
          className="time-button"
          onClick={props.onClickButton("previous")}
        >
          {props.previousButtonLabel}
        </button>
        <button className="time-button" onClick={props.onClickButton("today")}>
          {props.currentDateLabel}
        </button>
        <button className="time-button" onClick={props.onClickButton("next")}>
          {props.nextButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default FooterView;
