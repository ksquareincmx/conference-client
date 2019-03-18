import React from "react";
import { WeeksView, MonthsView, DaysView } from "components/Calendar";

export const CalendarStrategy = props => {
  switch (props.type) {
    case "day":
      return <DaysView {...props} />;
    case "work_week":
      return <WeeksView {...props} />;
    case "month":
      return <MonthsView {...props} />;
    default:
      return <DaysView {...props} />;
  }
};

export default CalendarStrategy;
