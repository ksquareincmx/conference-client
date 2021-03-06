import React, { Children } from "react";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import BigCalendar from "react-big-calendar";
import "./Months.css";
import fp from "lodash/fp";
import { formatEvents } from "mappers/AppointmentMapper";
import { toRoomColors } from "mappers/RoomMapper";

const styles = theme => ({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    minHeight: 900,
    margin: "auto"
  },
  grid: {
    minHeight: 422,
    maxHeight: "auto",
    width: "100%"
  }
});

const customDateCellWrapper = ({ children }) =>
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: "white"
    }
  });

const customEventWrapper = eventWrapper => {
  const { children, event } = eventWrapper;
  const { txtColor, bgColor } = toRoomColors(event.booking.room);
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
      backgroundColor: bgColor,
      border: `2px solid ${txtColor}`,
      color: txtColor,
      borderRadius: "5px",
      opacity: 0.7
    }
  });
};

const MonthsViewComponent = props => {
  const {
    bookings,
    roomList,
    type,
    minDate,
    maxDate,
    localizer,
    date,
    classes: styleClasses
  } = props;

  const { grid, gridContainer } = styleClasses;

  const components = {
    eventWrapper: customEventWrapper,
    event: props.components.event,
    dateCellWrapper: customDateCellWrapper
  };

  const getRoomsEvents = rooms => {
    const monthEvents = formatEvents(bookings);
    let roomEvents = [];
    rooms.forEach(room => {
      const fileteredEvents = monthEvents.filter(
        event => event.roomId === room.id
      );
      roomEvents = roomEvents.concat(fileteredEvents);
    });

    return roomEvents;
  };

  return (
    <div className={gridContainer}>
      <div className={classNames(grid, "month")}>
        <BigCalendar
          toolbar={false}
          events={getRoomsEvents(roomList)}
          formats={{ weekdayFormat: "dddd" }}
          views={[type]}
          defaultView={BigCalendar.Views.MONTH}
          min={minDate}
          max={maxDate}
          localizer={localizer}
          components={components}
          date={date}
          popup={true}
          onNavigate={fp.noop}
        />
      </div>
    </div>
  );
};

export const MonthsView = withStyles(styles)(MonthsViewComponent);
