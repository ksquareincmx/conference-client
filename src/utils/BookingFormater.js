import moment from "moment";
import { compose, capitalize } from "lodash/fp";

export const normaliceTZ = date => moment(date).local();

const isCurrentMonth = (date, today) =>
  date.year() === today.year() && date.month() === today.month();

export const getDateText = date => {
  if (date) {
    const today = moment();
    const tomorrow = moment().add(1, "days");

    return isCurrentMonth(date, today)
      ? date.date() === today.date()
        ? "Today"
        : date.date() === tomorrow.date()
        ? "Tomorrow"
        : date.format("L")
      : date.format("L");
  }
  return "";
};

export const formatDate = date => normaliceTZ(date);

export const formatDashedDate = date => date.format("YYYY-MM-DD");

export const formatTime = time => time.format("LT");

export const formatHours = date => date.format("HH");

export const formatMinutes = date => date.format("mm");

const abbreviate = name =>
  `${name.substring(0, 1)}${name.substring(name.length - 1)}`;

export const abbreviateRoomName = compose(
  capitalize,
  abbreviate
);
