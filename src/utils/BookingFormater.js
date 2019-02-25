import moment from "moment";

export const normaliceTZ = date => date.substring(0, date.length - 1);

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

export const formatDate = date => moment(normaliceTZ(date));

export const formatTime = time => time.format("LT");

export const abbreviateName = name =>
  `${name.substring(0, 1)}${name.substring(name.length - 1)}`;
