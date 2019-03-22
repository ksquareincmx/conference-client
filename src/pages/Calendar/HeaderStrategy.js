import React from "react";
import { CalendarHeader } from "./Headers/CalendarHeader";

const HeaderStrategy = props => {
  const {
    type,
    dayName,
    monthName,
    numberDayInMonth,
    fullYear,
    onClickNext,
    onClickPrev
  } = props;

  return type === "week" || type === "month" ? (
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

export default HeaderStrategy;
