import React, { Children } from "react";
import { withStyles } from "@material-ui/core";
import BigCalendar from "react-big-calendar";
import classNames from "classnames";
import "./Weeks.css";
import fp from "lodash/fp";
import { formatEvents } from "mappers/AppointmentMapper";
import { toRoomColors } from "mappers/RoomMapper";
import { getOffsets } from "utils/OffSets";

const styles = theme => ({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100%",
    margin: "auto"
  },
  grid: {
    minHeight: 422,
    maxHeight: "auto",
    width: "100%"
  }
});

const customTimeSlotWrapper = ({ children }) =>
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: "white",
      borderStyle: "none",
      color: "#7F7F7F",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end"
    }
  });

const customEventWrapper = eventWrapper => {
  const { children, event } = eventWrapper;
  const { txtColor, bgColor } = toRoomColors(event.booking.room);
  const { right, left } = getOffsets(event.isRight);
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
      left: left,
      right: right,
      width: "50%",
      fontSize: "0.8em",
      textAlign: "center",
      backgroundColor: bgColor,
      border: `2px solid ${txtColor}`,
      color: txtColor,
      borderRadius: 0,
      opacity: 0.7
    }
  });
};

const bigCustomEventWrapper = eventWrapper => {
  const { children, event } = eventWrapper;
  const { txtColor, bgColor } = toRoomColors(event.booking.room);
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
      width: "100%",
      fontSize: "0.8em",
      textAlign: "center",
      backgroundColor: bgColor,
      border: `2px solid ${txtColor}`,
      color: txtColor,
      borderRadius: 0,
      opacity: 0.7
    }
  });
};

const customEventContainerWrapper = eventWrapper => {
  const { children } = eventWrapper;
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
      marginRight: 0
    }
  });
};

const WeeksViewComponent = props => {
  const {
    bookings,
    roomList,
    roomSelected,
    isSingleGrid,
    type,
    step,
    minDate,
    maxDate,
    localizer,
    handleSelect,
    timeSlots,
    date,
    classes: styleClasses
  } = props;

  //TODO: Make to receive only the current room once CalendarPage is removed
  const room = roomSelected[0];

  const { gridContainer, grid } = styleClasses;

  const components = {
    eventWrapper: isSingleGrid ? bigCustomEventWrapper : customEventWrapper,
    eventContainerWrapper: customEventContainerWrapper,
    event: props.components.event,
    timeSlotWrapper: customTimeSlotWrapper
  };

  const getRoomsEvents = rooms => {
    const weekEvents = formatEvents(bookings);
    let roomEvents = [];
    rooms.forEach(room => {
      const fileteredEvents = weekEvents.filter(
        event => event.roomId === room.id
      );
      fileteredEvents.forEach(event => {
        const roomObj = rooms.find(obj => obj.id === event.booking.room.id);
        const isRight = rooms.indexOf(roomObj) === 1;
        event.isRight = isRight;
      });
      roomEvents = roomEvents.concat(fileteredEvents);
    });

    return roomEvents;
  };

  const viewType = type === "week" ? "work_week" : "week";

  return (
    <div className={gridContainer}>
      <div className={classNames(grid, "week")}>
        <BigCalendar
          selectable
          toolbar={false}
          events={getRoomsEvents(roomList)}
          views={[viewType]}
          step={step}
          defaultView={BigCalendar.Views.WORK_WEEK}
          min={minDate}
          max={maxDate}
          localizer={localizer}
          formats={{ timeGutterFormat: "HH:mm ", dayFormat: "dddd D" }}
          onSelectSlot={handleSelect(room.id, room.name)}
          timeslots={timeSlots}
          components={components}
          date={date}
          onNavigate={fp.noop}
        />
      </div>
    </div>
  );
};

export const WeeksView = withStyles(styles)(WeeksViewComponent);
