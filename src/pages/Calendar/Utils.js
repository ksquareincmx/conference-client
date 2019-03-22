import moment from "moment";
import dates from "react-big-calendar/lib/utils/dates";
import BigCalendar from "react-big-calendar";

export const addZeros = number => {
  if (number < 10) {
    return "0" + String(number);
  }
  return String(number);
};

export const daysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
export const monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Constants for CalendarStrategy
export const localizer = BigCalendar.momentLocalizer(moment);
export const minDate = dates.add(
  dates.startOf(new Date(), "day"),
  -16,
  "hours"
);
export const maxDate = dates.add(dates.endOf(new Date(), "day"), -5, "hours");
export const step = 15;
export const timeSlots = 2;

export const getNameDay = date => daysNames[date.getDay()];
export const getNameMonth = date => monthsNames[date.getMonth()];
export const getWeekOfYear = date => {
  let d = new Date(+date);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
};

export const footerChangeButtonLabels = type => {
  switch (type) {
    case "day":
      return {
        previousButtonLabel: "Previus day",
        nextButtonLabel: "Next day"
      };
    case "work_week":
      return {
        previousButtonLabel: "Previus week",
        nextButtonLabel: "Next week"
      };
    case "month":
      return {
        previousButtonLabel: "Previus month",
        nextButtonLabel: "Next month"
      };
    case "year":
      return {
        previousButtonLabel: "Previus year",
        nextButtonLabel: "Next year"
      };
    default:
      return {
        previousButtonLabel: "",
        nextButtonLabel: ""
      };
  }
};

export const getDateFormat = date => {
  const dateWithoutZ = date.substring(0, date.length - 5);
  const dateWithoutDots = dateWithoutZ.replace(".", ":");
  const dateFotmat = dateWithoutDots.replace("T", " ");
  var momentDate = moment(dateFotmat);
  return momentDate.toDate();
};
