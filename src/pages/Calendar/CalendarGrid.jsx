import React, { Fragment } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as Utils from "./Utils.js";
import CalendarStrategy from "./CalendarStrategy";
import { roomService } from "services";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";

class CalendarGridComponent extends React.Component {
  state = {
    rooms: []
  };

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
        title: "Failed to create the appointment",
        body: "An appointment can't be booked before today's date and time"
      });
    }

    this.props.onCreate(bookingInfo);
  };

  fetchRooms = async () => {
    const roomList = await roomService.getAll();
    const ROOMS_PER_CALENDAR = 2;
    roomList.length = ROOMS_PER_CALENDAR;
    this.setState({ rooms: roomList });
  };

  componentDidMount() {
    this.fetchRooms();
  }

  render() {
    return (
      // Why is a fragment here?
      <Fragment>
        <CalendarStrategy
          type={this.props.type}
          bookings={this.props.bookingsData}
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
