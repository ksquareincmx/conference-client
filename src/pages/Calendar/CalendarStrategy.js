import React from "react";
import WeeksView from "components/Calendar/Weeks";
import MonthsView from "components/Calendar/Months";
import YearsView from "components/Calendar/Years";
import DaysView from "components/Calendar/Days";

export const CalendarStrategy = props => {
  switch (props.type) {
    case "day":
      return <DaysView {...props} />;
    case "work_week":
      return <WeeksView {...props} />;
    case "month":
      return <MonthsView {...props} />;
    case "year":
      return <YearsView {...props} />;
    default:
      return <DaysView {...props} />;
  }
};

export default CalendarStrategy;
