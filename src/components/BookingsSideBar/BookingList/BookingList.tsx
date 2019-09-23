import React, { Fragment } from "react";
import { GridList, withStyles } from "@material-ui/core";
import { BookingItem } from "./BookingItem/BookingItem";
import * as bookingMapper from "mappers/BookingMapper";

const styles = {
  gridList: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 10,
  },
  emptyList: {
    height: "100%",
    width: "100%",
    color: "#808080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const BookingListComponent: React.SFC<any> = ({
  classes: { gridList, emptyList },
  bookingsData = [],
  onBookingsDataChange,
}) => {
  const bookings = bookingsData.map(bookingMapper.mapToListFormat);

  if (bookings.length === 0) {
    return (
      <div className={emptyList}>
        <h2>No results found</h2>
      </div>
    );
  }

  return (
    <Fragment>
      <GridList className={gridList}>
        {bookings.map((booking: any) => (
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

export const BookingList = withStyles(styles as any)(BookingListComponent);
