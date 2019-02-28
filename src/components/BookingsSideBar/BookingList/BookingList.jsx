import React from "react";
import { GridList, withStyles } from "@material-ui/core";
import { BookingItem } from "./BookingItem/BookingItem";
import cuid from "cuid";
import {
  getDateText,
  formatDate,
  abbreviateName
} from "../../../utils/BookingFormater";
import {
  filterNSortedByDate,
  filterBySearchTerm
} from "../../../utils/BookingFilters";
import { BookingConsumer } from "../../../providers/Booking/Booking";

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

class BookingListComponent extends React.Component {
  state = {
    bookingItems: []
  };

  getBookings = async () => {
    const stateBookings = this.state.bookingItems;
    let bookingItems = stateBookings.map(async book => {
      const user = this.props.userService.getUser(book.user_id);
      const room = this.props.roomService.getRoom(book.room_id);
      const data = await Promise.all([user, room]);
      const { name: roomName, color } = data[1];

      return {
        ...book,
        userName: data[0].name,
        roomName: roomName,
        roomNameAbbrev: abbreviateName(roomName),
        roomColor: color,
        dateText: getDateText(formatDate(book.start))
      };
    });

    try {
      const items =
        stateBookings.length > 0 ? await Promise.all(bookingItems) : null;
      if (items) {
        this.setState({ bookingItems: items });
      }
    } catch (err) {
      this.setState({ bookingItems: [] });
      //Temporal solution, here should be called the Norification system
      alert("Something went wrong with the server");
    }
  };

  async componentDidMount() {
    try {
      const data = await this.props.booking.getDetailedListOfBooking();
      this.setState({ bookingItems: data }, () => this.getBookings());
    } catch (err) {
      this.setState({ bookingItems: [] });
      //Temporal solution, here should be called the Norification system
      alert("Something went wrong with the server");
    }
  }

  render() {
    const stateBookings = this.state.bookingItems;

    const {
      classes: { gridList },
      searchTerm
    } = this.props;

    const bookingItems =
      stateBookings.length > 0
        ? filterBySearchTerm(
            filterNSortedByDate(this.state.bookingItems),
            searchTerm
          )
        : null;

    return (
      <GridList className={gridList}>
        {bookingItems
          ? bookingItems.map(data => (
              <BookingConsumer key={cuid()}>
                {bookingService => (
                  <BookingItem
                    key={cuid()}
                    booking={data}
                    bookingService={bookingService}
                  />
                )}
              </BookingConsumer>
            ))
          : "" /*Change for empty component;*/}
      </GridList>
    );
  }
}

export const BookingList = withStyles(styles)(BookingListComponent);
