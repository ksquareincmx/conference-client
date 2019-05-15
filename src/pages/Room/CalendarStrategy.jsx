import React from "react";
import { WeeksView, MonthsView, DaysView } from "components/Calendar";
import { CalendarViewSelectors } from "utils/Enums";

export const CalendarStrategy = props => {
  const { DAY, WEEK, MONTH } = CalendarViewSelectors;
  switch (props.type) {
    case DAY:
      return <DaysView {...props} />;
    case WEEK:
      return <WeeksView {...props} />;
    case MONTH:
      return <MonthsView {...props} />;
    default:
      return <DaysView {...props} />;
  }
};
