import React from "react";
import { GridList, withStyles } from "@material-ui/core";
import { BookingItem } from "./BookingItem/BookingItem";
import cuid from "cuid";

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
    let bookingItems = this.state.bookingItems.map(async book => {
      const user = this.props.userService.getUser(book.user_id);
      const room = this.props.roomService.getRoom(book.room_id);
      const data = await Promise.all([user, room]);

      return {
        ...book,
        userName: data[0].name,
        roomName: data[1].name,
        roomColor: data[1].color
      };
    });

    const items = await Promise.all(bookingItems);
    this.setState({ bookingItems: items });
  };

  async componentDidMount() {
    const data = await this.props.booking.getDetailedListOfBooking();
    this.setState({ bookingItems: data }, () => this.getBookings());
  }

  render() {
    const { classes } = this.props;
    return (
      <GridList className={classes.gridList}>
        {this.state.bookingItems.map(data => (
          <BookingItem key={cuid()} booking={data} />
        ))}
      </GridList>
    );
  }
}

export const BookingList = withStyles(styles)(BookingListComponent);
