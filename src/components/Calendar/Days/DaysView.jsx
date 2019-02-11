import React from "react";
import BigCalendar from "react-big-calendar";
import "./Days.css";

const dayGrid = props => idConference => {
  return (
    <div className="day-agenda" key={idConference}>
      <div className="day-header">
        <h2 className="conference-room-name">
          Conference Room #{idConference + 1}
        </h2>
      </div>
      <BigCalendar
        selectable
        events={props.events[idConference]}
        views={[props.type]}
        step={props.step}
        defaultView={BigCalendar.Views.DAY}
        min={props.minDate}
        max={props.maxDate}
        formats={{ timeGutterFormat: "hh:mm A", dayFormat: "ddd D" }}
        localizer={props.localizer}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={props.handleSelect(idConference)}
        timeslots={props.timeSlots}
        components={props.components}
        date={props.date}
        onNavigate={() => {}}
      />
    </div>
  );
};

const DaysView = props => {
  return <div className="days-container">{[0, 1].map(dayGrid(props))}</div>;
};

export default DaysView;
