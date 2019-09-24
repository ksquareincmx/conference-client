import React from "react";
import { WeeksView, DaysView } from "components/Calendar";
import { CalendarViewSelectors } from "utils/Enums";

export const CalendarStrategy = props => {
  const { DAY, WEEK } = CalendarViewSelectors;
  switch (props.type) {
    case WEEK:
      return <WeeksView {...props} />;

    case DAY:
    default:
      return <DaysView {...props} />;
  }
};
