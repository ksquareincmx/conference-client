import React from "react";
import { CalendarHeader } from "./Headers/CalendarHeader";
import { CalendarViewSelectors } from "utils/Enums";

export const HeaderStrategy = props => {
  const {
    type,
    dayName,
    monthName,
    numberDayInMonth,
    fullYear,
    onClickNext,
    onClickPrev
  } = props;
  const { WEEK, MONTH } = CalendarViewSelectors;

  return type === WEEK || type === MONTH ? (
    <CalendarHeader
      titleTxt={monthName}
      subtitleTxt={fullYear}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />
  ) : (
    <CalendarHeader
      titleTxt={`${monthName} ${numberDayInMonth}`}
      subtitleTxt={dayName}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />
  );
};
