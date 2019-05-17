import React from "react";
import { withRouter } from "react-router-dom";
import { bookingService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";

class CalendarContainerComponent extends React.Component {
  state = {
    bookingsData: [],
    isServerDown: false
  };

  fetchBookings = async () => {
    try {
      const { URLRoomId } = this.props;
      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        URLRoomId
      );
      if (data.bookings) {
        const { bookings: bookingsData } = data;
        this.setState({ bookingsData, isServerDown: false });
      } else {
        this.setState({ isServerDown: true });
      }
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  };

  componentDidMount() {
    this.fetchBookings();
  }

  handleBookingsDataChange = () => {
    this.fetchBookings();
  };

  render() {
    const { bookingsData, isServerDown } = this.state;
    const { URLRoomId } = this.props;
    if (isServerDown) {
      return <Error500 />;
    }
    return (
      <Calendar
        bookingsData={bookingsData}
        onBookingsDataChange={this.handleBookingsDataChange}
        URLRoomId={URLRoomId}
      />
    );
  }
}

export const CalendarContainer = withRouter(CalendarContainerComponent);
