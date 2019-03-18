import React from "react";
import { CalendarHeader } from "./Headers/CalendarHeader";

const HeaderStrategy = props => {
  const {
    type,
    dayName,
    monthName,
    numberDayInMonth,
    fullYear,
    onClickButton
  } = props;

  return type === "work_week" || type === "month" ? (
    <CalendarHeader
      titleTxt={monthName}
      subtitleTxt={fullYear}
      onClickButton={onClickButton}
    />
  ) : (
    <CalendarHeader
      titleTxt={`${monthName} ${numberDayInMonth}`}
      subtitleTxt={dayName}
      onClickButton={onClickButton}
    />
  );
};

export default HeaderStrategy;
