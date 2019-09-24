import React from "react";
import { CalendarHeader } from "./Headers/CalendarHeader";
import { CalendarViewSelectors } from "utils/Enums";

const { WEEK, MONTH } = CalendarViewSelectors;

export interface IHeaderStrategy {
  type: String;
  dayName: String;
  monthName: String;
  numberDayInMonth: Number;
  fullYear: Number;
  onClickNext: Function;
  onClickPrev: Function;
}

export const HeaderStrategy: React.SFC<IHeaderStrategy> = ({
  type,
  dayName,
  monthName,
  numberDayInMonth,
  fullYear,
  onClickNext,
  onClickPrev,
}) => (
  <React.Fragment>
    {type === WEEK ? (
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
    )}
  </React.Fragment>
);
