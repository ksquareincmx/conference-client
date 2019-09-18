import React, { Fragment } from "react";
import { GridList, withStyles } from "@material-ui/core";
import { BookingItem } from "./BookingItem/BookingItem";
import * as bookingMapper from "mappers/BookingMapper";
import { filterNSortedByDate, filterByTerm } from "utils/BookingFilters";

const styles = () => ({
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

// filterBookingsByTerm :: (String, IBooking[]) -> IBooking[]
const filterBookingsByTerm = (filterTerm, bookings = []) => {
  return filterByTerm(filterTerm, filterNSortedByDate(bookings));
};

const BookingListComponent = ({
  classes: { gridList, emptyList },
  filterTerm,
  bookingsData = [],
  onBookingsDataChange
}) => {
  const filteredBookings = filterBookingsByTerm(
    filterTerm,
    bookingsData.map(bookingMapper.mapToListFormat)
  );

  if (filteredBookings.length === 0) {
    return (
      <div className={emptyList}>
        <h2>No results found</h2>
      </div>
    );
  }

  return (
    <Fragment>
      <GridList className={gridList}>
        {filteredBookings.map(booking => (
          <BookingItem
            key={booking.id}
            booking={booking}
            onBookingsDataChange={onBookingsDataChange}
          />
        ))}
      </GridList>
    </Fragment>
  );
};

export const BookingList = withStyles(styles)(BookingListComponent);
