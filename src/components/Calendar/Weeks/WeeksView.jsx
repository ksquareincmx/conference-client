import React, { Children } from "react";
import { withStyles } from "@material-ui/core";
import BigCalendar from "react-big-calendar";
import classNames from "classnames";
import "./Weeks.css";
import fp from "lodash/fp";
import { formatEvents } from "mappers/AppointmentMapper";
import { getEventColors } from "utils/BookingColors";

const styles = theme => ({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    height: 600,
    margin: "auto"
  },
  grid: {
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
  const styles = getEventColors(event.color);
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.props.style,
      width: "50%",
      fontSize: "0.8em",
      textAlign: "center",
      backgroundColor: styles.backgroundColor,
      border: `2px solid ${styles.borderColor}`,
      color: styles.textColor,
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

  const weekEvents = formatEvents(bookings);

  const { gridContainer, grid } = styleClasses;

  const components = {
    eventWrapper: customEventWrapper,
    eventContainerWrapper: customEventContainerWrapper,
    event: props.components.event,
    timeSlotWrapper: customTimeSlotWrapper
  };

  const viewType = type === "week" ? "work_week" : "week";

  return (
    <div className={gridContainer}>
      <div className={classNames(grid, "week")}>
        <BigCalendar
          selectable
          toolbar={false}
          events={weekEvents}
          views={[viewType]}
          step={step}
          defaultView={BigCalendar.Views.WORK_WEEK}
          min={minDate}
          max={maxDate}
          localizer={localizer}
          formats={{ dayFormat: "dddd D" }}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={handleSelect(0)}
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
