import moment from "moment";
import { formatDate } from "./BookingFormater";

export const sortByDate = bookingItems =>
  bookingItems.sort(
    (a, b) => formatDate(a.start).unix() - formatDate(b.start).unix()
  );

const getTodaySpecificHour = hour => {
  return moment().hour(hour);
};

export const filterByDate = bookingItems => {
  const MORNING = 6;
  const today = getTodaySpecificHour(MORNING).unix();
  return bookingItems.filter(({ start }) => formatDate(start).unix() >= today);
};

export const getUTCDateFilter = () => {
  const FIRSTHOUR = 0;
  const today = getTodaySpecificHour(FIRSTHOUR)
    .minute(0)
    .utc()
    .format();
  return today;
};

export const filterNSortedByDate = bookingItems =>
  sortByDate(filterByDate(bookingItems));

export const filterBySearchTerm = (bookingItems, searchTerm) =>
  bookingItems.filter(
    ({ userName, roomName, roomNameAbbrev, description, dateText }) =>
      `${userName} ${roomName} ${roomNameAbbrev} ${description} ${dateText}`
        .toUpperCase()
        .indexOf(searchTerm.toUpperCase()) >= 0
  );
