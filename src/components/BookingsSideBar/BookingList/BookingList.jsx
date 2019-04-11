import React from "react";
import cuid from "cuid";
import { GridList, withStyles } from "@material-ui/core";
import { BookingItem } from "./BookingItem/BookingItem";
import { mapToListFormat } from "mappers/bookingMapper";
import { filterNSortedByDate, filterByTerm } from "utils/BookingFilters";

const styles = theme => ({
  gridList: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 10
  }
});

const filterBookingsByTerm = (bookings, filterTerm) => {
  return bookings.length > 0
    ? filterByTerm(filterNSortedByDate(bookings), filterTerm)
    : "";
};

const BookingListComponent = ({
  classes: { gridList },
  filterTerm,
  bookingsData,
  onBookingsDataChange
}) => {
  const formatedBookingsData = bookingsData.map(mapToListFormat);
  const filteredBookings = filterBookingsByTerm(
    formatedBookingsData,
    filterTerm
  );

  return (
    <GridList className={gridList}>
      {filteredBookings
        ? filteredBookings.map(booking => (
            <BookingItem
              key={cuid()}
              booking={booking}
              onBookingsDataChange={onBookingsDataChange}
            />
          ))
        : ""}
    </GridList>
  );
};

export const BookingList = withStyles(styles)(BookingListComponent);
