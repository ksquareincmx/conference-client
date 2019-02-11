import React from "react";
import DayHeader from "./Headers/DayHeader";
import WeekHeader from "./Headers/WeekHeader";
import MonthHeader from "./Headers/MonthHeader";
import YearHeader from "./Headers/YearHeader";

const HeaderStrategy = props => {
  switch (props.type) {
    case "day":
      return (
        <DayHeader
          dayName={props.dayName}
          monthName={props.monthName}
          numberDayInMonth={props.numberDayInMonth}
          fullYear={props.fullYear}
        />
      );
    case "work_week":
      return (
        <WeekHeader
          numberWeekInYear={props.numberWeekInYear}
          monthName={props.monthName}
          numberDayInMonth={props.numberDayInMonth}
          fullYear={props.fullYear}
        />
      );
    case "month":
      return (
        <MonthHeader monthName={props.monthName} fullYear={props.fullYear} />
      );
    case "year":
      return <YearHeader fullYear={props.fullYear} />;
    default:
      return null;
  }
};

export default HeaderStrategy;
