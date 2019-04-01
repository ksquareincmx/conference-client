import React, { Fragment } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DraggingCalendar from "components/Modals/DraggingCalendar";
import * as AppointmentMapper from "mappers/AppointmentMapper";
import * as Utils from "./Utils.js";
import CalendarStrategy from "./CalendarStrategy";
import { getUTCDateFilter } from "utils/BookingFilters";
import { bookingService, roomService } from "services";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";

class CalendarGridComponent extends React.Component {
  state = {
    events: [],
    rooms: [],
    appointmentInfo: {
      start: {
        hours: "0",
        minutes: "0"
      },
      end: {
        hours: "0",
        minutes: "0"
      },
      roomId: 0,
      date: {
        day: 0,
        month: 0,
        year: 0
      },
      reasonAppointment: ""
    }
  };

  handleClickCreateBookingDraggingCalendar = async () => {
    const post = AppointmentMapper.toDto(this.state.appointmentInfo);
    const res = await bookingService.createOne(post);
    this.props.history.push("/calendar");
  };

  handleChangeReasonAppointment = event => {
    const keyPressed = event.target.value;
    this.setState(prevState => {
      prevState.appointmentInfo.reasonAppointment = keyPressed;
      return prevState;
    });
  };

  customEventView = ({ event }) => {
    return <Event content={event.title} />;
  };

  handleSelect = (roomId, roomName) => event => {
    const start = event.start;
    const end = event.end;
    const appointmentInfo = {
      start,
      end,
      roomName,
      roomId
    };
    const title = 1;

    if (end < new Date()) {
      return this.shootNotification({
        message: {
          reason: "Failed to create the appointment",
          details: "A meeting can't be booked before today's date and time"
        },
        sticker: {
          color: "grey",
          text: "X"
        },
        variant: "error"
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

  shootNotification = content => {
    // TODO: This functionality must be in a provider
    const { notify } = this.props;
    const configOptions = {
      autoDismissTimeout: 5000,
      autoDismiss: true
    };
    notify(content, configOptions);
  };

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

        <DraggingCalendar
          coordinates={this.state.coordinates}
          appointmentInfo={this.state.appointmentInfo}
          onChange={this.handleChangeReasonAppointment}
          onClick={this.handleClickCreateBookingDraggingCalendar}
        />
      </Fragment>
    );
  }
}

export const CalendarGrid = withNotifications(CalendarGridComponent);
