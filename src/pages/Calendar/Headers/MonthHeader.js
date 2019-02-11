import React from "react";

const MonthHeader = props => (
  <div className="header-date-container">
    <p className="top-date">{props.monthName}</p>
    <p className="bottom-date">{props.fullYear}</p>
  </div>
);

export default MonthHeader;
