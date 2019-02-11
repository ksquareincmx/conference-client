import React from "react";

const DayHeader = props => (
  <div className="header-date-container">
    <p className="top-date">{props.dayName}</p>
    <p className="bottom-date">{`${props.monthName} ${props.numberDayInMonth} ${
      props.fullYear
    }`}</p>
  </div>
);

export default DayHeader;
