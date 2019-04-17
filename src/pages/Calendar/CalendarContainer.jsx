import React from "react";
import { bookingService } from "services";
import { Calendar } from "./Calendar";
import { getUTCDateFilter } from "utils/BookingFilters";

export class CalendarContainer extends React.Component {
  state = {
    bookingsData: []
  };

  fetchBookings = async () => {
    try {
      const data = await bookingService.getAllWithDetails(getUTCDateFilter());
      const { bookings: bookingsData } = data;
      this.setState({ bookingsData });
    } catch (error) {
      console.log(error);
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
    const { bookingsData } = this.state;
    return (
      <Calendar
        bookingsData={bookingsData}
        onBookingsDataChange={this.handleBookingsDataChange}
      />
    );
  }
}
