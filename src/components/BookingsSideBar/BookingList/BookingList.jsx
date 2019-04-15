import React, { Fragment } from "react";
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
  },
  emptyList: {
    height: "100%",
    width: "100%",
    color: "#808080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const filterBookingsByTerm = (bookings, filterTerm) => {
  return bookings.length > 0
    ? filterByTerm(filterNSortedByDate(bookings), filterTerm)
    : "";
};

const BookingListComponent = ({
  classes: { gridList, emptyList },
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
    <Fragment>
      {filteredBookings.length > 0 ? (
        <GridList className={gridList}>
          {filteredBookings.map(booking => (
            <BookingItem
              key={cuid()}
              booking={booking}
              onBookingsDataChange={onBookingsDataChange}
            />
          ))}
        </GridList>
      ) : (
        <div className={emptyList}>
          <h2>No results found</h2>
        </div>
      )}
    </Fragment>
  );
};

export const BookingList = withStyles(styles)(BookingListComponent);
