import React from "react";

import BigCalendar from "react-big-calendar";
import "./Years.css";

const monthRow = props => idMonth => (
  <div className="column" key={idMonth}>
    <BigCalendar
      events={[...props.events[0], ...props.events[1]]}
      views={[props.type]}
      defaultView={BigCalendar.Views.MONTH}
      min={props.minDate}
      max={props.maxDate}
      localizer={props.localizer}
      components={props.components}
      date={new Date(props.date.getFullYear(), idMonth)}
      onNavigate={() => {}}
    />
  </div>
);

const YearsView = props => {
  return (
    <div className="years-container">
      <div className="row">
        {[0, 1, 2, 3].map(monthRow({ ...props, type: "month" }))}
      </div>
      <div className="row">
        {[4, 5, 6, 7].map(monthRow({ ...props, type: "month" }))}
      </div>
      <div className="row">
        {[8, 9, 10, 11].map(monthRow({ ...props, type: "month" }))}
      </div>
    </div>
  );
};

export default YearsView;
