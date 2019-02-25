import moment from "moment";
import { formatDate } from "./BookingFormater";

export const sortByDate = bookingItems =>
  bookingItems.sort(
    (a, b) => formatDate(a.start).unix() - formatDate(b.start).unix()
  );

export const filterByDate = bookingItems => {
  const MORNING = 6;
  const today = moment()
    .hour(MORNING)
    .unix();
  return bookingItems.filter(({ start }) => formatDate(start).unix() >= today);
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
