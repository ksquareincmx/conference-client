import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import compose from "lodash/fp/compose";
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";
import { withAuthContext } from "hocs/Auth";

class CalendarContainerComponent extends React.Component {
  state = {
    bookingsData: [],
    allBookingsData: [],
    isServerDown: false,
    roomId: "",
    isLoading: true
  };

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = async () => {
    try {
      const { URLRoomId, authContext, history } = this.props;
      const { onLogout } = authContext;
      const reqRoom = await roomService.getOneById(URLRoomId);
      const allData = await bookingService.getAllWithDetails(
        getUTCDateFilter()
      );
      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        URLRoomId
      );
      if (data.bookings && allData.bookings) {
        const { bookings: allBookingsData } = allData;
        const { bookings: bookingsData } = data;
        this.setState({ bookingsData, allBookingsData, isServerDown: false });
      } else {
        const { name } = data;
        // The webtoken is invalid for any reason
        if (name === "JsonWebTokenError") {
          onLogout();
          return history.push("/login");
        } else {
          this.setState({ isServerDown: true });
        }
      }

      if (typeof reqRoom === "object") {
        return this.setState({ roomId: URLRoomId, isLoading: false });
      }
      return this.setState({ roomId: "", isLoading: false });
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  };

  handleBookingsDataChange = () => {
    this.fetchBookings();
  };

  render() {
    const {
      allBookingsData,
      bookingsData,
      isServerDown,
      roomId,
      isLoading
    } = this.state;

    if (isServerDown) {
      return <Error500 />;
    }

    return (
      <Calendar
        allBookingsData={allBookingsData}
        bookingsData={bookingsData}
        onBookingsDataChange={this.handleBookingsDataChange}
        URLRoomId={roomId}
        isLoading={isLoading}
      />
    );
  }
}

export const CalendarContainer = compose(
  withRouter,
  withAuthContext
)(CalendarContainerComponent);
