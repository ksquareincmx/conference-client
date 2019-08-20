import React from "react";
import { WeeksView, MonthsView, DaysView } from "components/Calendar";
import { CalendarViewSelectors } from "utils/Enums";

export const CalendarStrategy = props => {
  const { DAY, WEEK, MONTH } = CalendarViewSelectors;
  switch (props.type) {
    case WEEK:
      return <WeeksView {...props} />;
    case MONTH:
      return <MonthsView {...props} />;
    case DAY:
    default:
      return <DaysView {...props} />;
  }
};
