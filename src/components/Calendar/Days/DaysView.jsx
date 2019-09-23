import React, { Children } from "react";
import BigCalendar from "react-big-calendar";
import { withStyles } from "@material-ui/core";
import "./Days.css";
import classNames from "classnames";
import { mapEventsByRoom } from "mappers/AppointmentMapper";
import { toRoomColors } from "mappers/RoomMapper";
import fp from "lodash/fp";
import cuid from "cuid";
import { When } from "components/When/When";

const styles = theme => ({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100%",
    margin: "auto",
    marginBottom: 46,
    border: "1px solid lightgrey"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh"
  },
  grid: {
    minHeight: 380,
    maxHeight: "auto",
    width: "50%",
    borderBottom: 0
  },
  bigGrid: {
    minHeight: 380,
    maxHeight: "auto",
    width: "100%",
    borderBottom: 0
  },
  gridHeaderContainer: {
    height: 40,
    backgroundColor: "white",
    boxShadow: "0px 5px 2px rgba(0,0,0,0.1)",
    position: "relative",
    zIndex: "1"
  },
  gridGutter: {
    height: "100%",
    width: 49.5,
    borderRight: "1px solid lightgrey"
  },
  gridGutterless: {
    height: "100%",
    width: 49,
    borderLeft: "1px solid lightgrey"
  },
  gridHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  gridHeaderTxt: {
    color: "#808080",
    margin: 0,
    position: "absolute"
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
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
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

const DayGrid = props => room => {
  const {
    bookings,
    roomList,
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

  const {
    grid,
    bigGrid,
    gridHeaderContainer,
    gridGutter,
    gridGutterless,
    gridHeader,
    gridHeaderTxt
  } = styleClasses;

  const components = {
    eventWrapper: customEventWrapper,
    eventContainerWrapper: customEventContainerWrapper,
    event: props.components.event,
    timeSlotWrapper: customTimeSlotWrapper
  };

  const getRoomEvents = roomId => {
    const events = mapEventsByRoom(bookings, roomList);
    const eventsObj = events.find(
      eventsByRoom => eventsByRoom.roomId === roomId
    );
    return eventsObj.roomEvents;
  };

  const roomEvents = room ? getRoomEvents(room.id) : [];
  const roomObj = roomList.find(obj => obj.id === room.id);
  const isGutterless = roomList.indexOf(roomObj) === 1;
  const gutterless = isGutterless ? "gutterless" : null;
  const gridStyle = isSingleGrid ? bigGrid : grid;

  return (
    <div
      className={classNames(gridStyle, "day", gutterless)}
      key={room ? room.id : cuid()}
    >
      <div className={gridHeaderContainer}>
        <When predicate={isGutterless}>
          <div className={gridGutterless} />
        </When>
        <When predicate={!isGutterless}>
          <div className={gridGutter} />
        </When>

        <div className={gridHeader}>
          <h3 className={gridHeaderTxt}>
            {room ? `${room.name} Room` : "Loading"}
          </h3>
        </div>
      </div>

      <BigCalendar
        selectable
        toolbar={false}
        scrollToTime={new Date(2000, 1, 1, 0)}
        events={roomEvents}
        views={[type]}
        step={step}
        defaultView={BigCalendar.Views.DAY}
        min={minDate}
        max={maxDate}
        formats={{ timeGutterFormat: "HH:mm ", dayFormat: "ddd D" }}
        localizer={localizer}
        onSelectSlot={room ? handleSelect(room.id, room.name) : null}
        timeslots={timeSlots}
        components={components}
        date={date}
        onNavigate={fp.noop}
      />
    </div>
  );
};

const DaysViewComponent = props => {
  const { roomList, classes: styleClasses, isSingleGrid, roomSelected } = props;
  const { gridContainer, loadingContainer } = styleClasses;

  if (isSingleGrid && roomSelected) {
    return (
      <div className={gridContainer}>{roomSelected.map(DayGrid(props))}</div>
    );
  }

  if (roomList) {
    return <div className={gridContainer}>{roomList.map(DayGrid(props))}</div>;
  }

  return (
    <div className={loadingContainer}>
      <h1>LOADING...</h1>
    </div>
  );
};

export const DaysView = withStyles(styles)(DaysViewComponent);
