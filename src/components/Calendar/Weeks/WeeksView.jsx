import React, { Children } from "react";
import { withStyles } from "@material-ui/core";
import BigCalendar from "react-big-calendar";
import classNames from "classnames";
import "./Weeks.css";

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

const WeeksViewComponent = props => {
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

  const { gridContainer, grid } = styleClasses;

  const components = {
    event: props.components.event,
    timeSlotWrapper: customTimeSlotWrapper
  };

  return (
    <div className={gridContainer}>
      <div className={classNames(grid, "week")}>
        <BigCalendar
          selectable
          toolbar={false}
          events={[...events[0], ...events[1]]}
          views={[type]}
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
          onNavigate={() => {}}
        />
      </div>
    </div>
  );
};

export const WeeksView = withStyles(styles)(WeeksViewComponent);
