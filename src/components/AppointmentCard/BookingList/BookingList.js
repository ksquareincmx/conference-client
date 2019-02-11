import React from "react";
import List from "@material-ui/core/List";
import BookingItem from "./BookingItem";
import cuid from "cuid";
import "./BookingList.css";

class BookigList extends React.Component {
  state = {
    bookingItems: []
  };

  getUsers = async () => {
    let bookingItems = this.state.bookingItems.map(async book => {
      const user = this.props.userService.getUser(book.user_id);
      const room = this.props.roomService.getRoom(book.room_id);

      const data = await Promise.all([user, room]);
      return {
        ...book,
        userName: data[0].name.toUpperCase(),
        roomName: data[1].name
      };
    });

    const items = await Promise.all(bookingItems);
    this.setState({ bookingItems: items });
  };

  async componentDidMount() {
    const data = await this.props.booking.getDetailedListOfBooking();
    data.map(item => {
      this.setState({ bookingItems: data }, () => this.getUsers());
    });
  }

  render() {
    return (
      <List component="nav" className="booking-list">
        {this.state.bookingItems.map(data => (
          <BookingItem
            key={cuid()}
            booking={data}
            clicked={this.props.clicked}
          />
        ))}
      </List>
    );
  }
}
export default BookigList;
