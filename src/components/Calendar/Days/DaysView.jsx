import React, { Children } from "react";
import BigCalendar from "react-big-calendar";
import { withStyles } from "@material-ui/core";
import "./Days.css";
import classNames from "classnames";

const styles = theme => ({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    height: 564,
    margin: "auto"
  },
  grid: {
    width: "50%",
    border: "1px solid lightgrey"
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
    width: 78,
    borderRight: "1px solid lightgrey"
  },
  gridHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  gridHeaderTxt: {
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

const dayGrid = props => idConference => {
  const {
    events,
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
    gridHeaderContainer,
    gridGutter,
    gridHeader,
    gridHeaderTxt
  } = styleClasses;

  const components = {
    event: props.components.event,
    timeSlotWrapper: customTimeSlotWrapper
  };

  return (
    <div className={classNames(grid, "day")} key={idConference}>
      <div className={gridHeaderContainer}>
        <div className={gridGutter} />
        <div className={gridHeader}>
          <h3 className={gridHeaderTxt}>Conference Room #{idConference + 1}</h3>
        </div>
      </div>
      <BigCalendar
        selectable
        toolbar={false}
        scrollToTime={new Date(2000, 1, 1, 0)}
        events={events[idConference]}
        views={[type]}
        step={step}
        defaultView={BigCalendar.Views.DAY}
        min={minDate}
        max={maxDate}
        formats={{ timeGutterFormat: "hh:mm A", dayFormat: "ddd D" }}
        localizer={localizer}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect(idConference)}
        timeslots={timeSlots}
        components={components}
        date={date}
        onNavigate={() => {}}
      />
    </div>
  );
};

const DaysViewComponent = props => {
  const { gridContainer } = props.classes;
  return <div className={gridContainer}>{[0, 1].map(dayGrid(props))}</div>;
};

export const DaysView = withStyles(styles)(DaysViewComponent);
