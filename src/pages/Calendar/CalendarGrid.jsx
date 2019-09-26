import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as Utils from "./Utils";
import { CalendarStrategy } from "./CalendarStrategy";
import { Event } from "components/Calendar";
import { withNotifications } from "hocs";
import { formatDate } from "utils/BookingFormater";
import { isColliding } from "utils/CollisionChecker";
import { isWorkingHour } from "components/Modals/CreateMeeting/meetingValidations";
import Hotkeys from "react-hot-keys";

class CalendarGridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = React.createRef();
  }

  customEventView = content => {
    return (
      <Event
        content={content}
        onBookingsDataChange={this.props.onBookingsDataChange}
        isSingleGrid={true}
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

    const triggerOpenModal = this.props.onCreate(bookingInfo);
    triggerOpenModal();
  };

  handleOpenEmptyModal = () => {
    const { date } = this.props;
    const { id, name } = this.props.selectedRoom[0];
    const roomData = { roomId: id, roomName: name, start: date };
    if (id) {
      const triggerOpenModal = this.props.onCreate(roomData);
      triggerOpenModal();
    }
  };

  componentDidMount() {
    this.calendar.current.focus();
  }

  render() {
    const { bookingsData, type, selectedRoom, date } = this.props;
    const { localizer, minDate, maxDate, step, timeSlots } = Utils;
    return (
      <Hotkeys keyName="ctrl+b,command+b" onKeyDown={this.handleOpenEmptyModal}>
        <div ref={this.calendar}>
          <CalendarStrategy
            type={type}
            bookings={bookingsData}
            roomList={selectedRoom}
            roomSelected={selectedRoom}
            handleSelect={this.handleSelect}
            components={{
              event: this.customEventView
            }}
            localizer={localizer}
            minDate={minDate}
            maxDate={maxDate}
            step={step}
            timeSlots={timeSlots}
            date={date}
            isSingleGrid={true}
          />
        </div>
      </Hotkeys>
    );
  }
}

export const CalendarGrid = withNotifications(CalendarGridComponent);
