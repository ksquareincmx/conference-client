import React from "react";

import BigCalendar from "react-big-calendar";
import "./Months.css";

const MonthsView = props => {
  return (
    <div className="months-container">
      <BigCalendar
        events={[...props.events[0], ...props.events[1]]}
        views={[props.type]}
        defaultView={BigCalendar.Views.MONTH}
        min={props.minDate}
        max={props.maxDate}
        localizer={props.localizer}
        components={props.components}
        date={props.date}
        onNavigate={() => {}}
      />
    </div>
  );
};

export default MonthsView;
