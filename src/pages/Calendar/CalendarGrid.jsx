import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as Utils from "./Utils.js";
import CalendarStrategy from "./CalendarStrategy";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";
import { formatDate } from "utils/BookingFormater";
import { isColliding } from "utils/CollisionChecker";
import { isWorkingHour } from "components/Modals/CreateMeeting/meetingValidations";

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
    const { onErrorNotification, bookingsData } = this.props;
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
    if (!isWorkingHour(formatDate(end))) {
      return onErrorNotification({
        title: "Can't create bookings after 18:00",
        body: "A booking can be made from 8:00 to 18:00"
      });
    }
    if (isColliding(bookingInfo, bookingsData)) {
      return onErrorNotification({
        title: "Time slot occupied",
        body: "There is anothe booking in this time slot"
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
