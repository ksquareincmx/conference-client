import React, { Fragment } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as Utils from "./Utils.js";
import CalendarStrategy from "./CalendarStrategy";
import { roomService } from "services";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";

class CalendarGridComponent extends React.Component {
  customEventView = content => {
    return (
      <Event
        content={content}
        onBookingsDataChange={this.props.onBookingsDataChange}
      />
    );
  };

  handleSelect = (roomId, roomName) => event => {
    const { onErrorNotification } = this.props;
    const start = event.start;
    const end = event.end;
    const bookingInfo = {
      start,
      end,
      roomName,
      roomId
    };

    if (end < new Date()) {
      return onErrorNotification({
        title: "Can't create bookings in the past",
        body: "A booking can't be made before today's date and time"
      });
    }

    this.props.onCreate(bookingInfo);
  };

  render() {
    return (
      <CalendarStrategy
        type={this.props.type}
        bookings={this.props.bookingsData}
        roomList={this.props.selectedRooms}
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
    );
  }
}

export const CalendarGrid = withNotifications(CalendarGridComponent);
