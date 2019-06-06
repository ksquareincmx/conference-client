import React from "react";
import { withRouter } from "react-router-dom";
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";

class CalendarContainerComponent extends React.Component {
  state = {
    bookingsData: [],
    isServerDown: false,
    roomId: "",
    isLoading: true
  };

  fetchBookings = async () => {
    try {
      const { URLRoomId } = this.props;
      const reqRoom = await roomService.getOneById(URLRoomId);
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

      if (typeof reqRoom === "object") {
        return this.setState({ roomId: URLRoomId, isLoading: false });
      }
      return this.setState({ roomId: "", isLoading: false });
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
    const { bookingsData, isServerDown, roomId, isLoading } = this.state;
    if (isServerDown) {
      return <Error500 />;
    }
    return (
      <Calendar
        bookingsData={bookingsData}
        onBookingsDataChange={this.handleBookingsDataChange}
        URLRoomId={roomId}
        isLoading={isLoading}
      />
    );
  }
}

export const CalendarContainer = withRouter(CalendarContainerComponent);
