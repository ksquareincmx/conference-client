import React from "react";

const WeekHeader = props => (
  <div className="header-date-container">
    <p className="top-date">Week #{props.numberWeekInYear}</p>
    <p className="bottom-date">{`${props.monthName} ${props.numberDayInMonth} ${
      props.fullYear
    }`}</p>
  </div>
);

export default WeekHeader;
