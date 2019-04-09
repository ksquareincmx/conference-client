import React, { Fragment } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as Utils from "./Utils.js";
import CalendarStrategy from "./CalendarStrategy";
import { getUTCDateFilter } from "utils/BookingFilters";
import { bookingService, roomService } from "services";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";

class CalendarGridComponent extends React.Component {
  state = {
    events: [],
    rooms: []
  };

  customEventView = content => {
    return <Event content={content} />;
  };

  handleSelect = (roomId, roomName) => event => {
    const { onErrorNotification } = this.props;
    const start = event.start;
    const end = event.end;
    const appointmentInfo = {
      start,
      end,
      roomName,
      roomId
    };

    if (end < new Date()) {
      return onErrorNotification({
        title: "Failed to create the appointment",
        body: "A meeting can't be booked before today's date and time"
      });
    }

    this.props.onCreate(appointmentInfo);
  };

  fetchBookings = async () => {
    const bookingsList = await bookingService.getAllWithDetails(
      getUTCDateFilter()
    );
    const roomList = await roomService.getAll();
    const ROOMS_PER_CALENDAR = 2;
    roomList.length = ROOMS_PER_CALENDAR;
    this.setState({ events: bookingsList.bookings, rooms: roomList });
  };

  componentDidMount() {
    this.fetchBookings();
  }

  render() {
    return (
      <Fragment>
        <CalendarStrategy
          type={this.props.type}
          bookings={this.state.events}
          roomList={this.state.rooms}
          handleSelect={this.handleSelect}
          components={{
            event: this.customEventView
          }}
          localizer={Utils.localizer}
          minDate={Utils.minDate}
          maxDate={Utils.maxDate}
          step={Utils.step}
          timeSlots={Utils.timeSlots}
          date={this.props.date}
        />
      </Fragment>
    );
  }
}

export const CalendarGrid = withNotifications(CalendarGridComponent);
