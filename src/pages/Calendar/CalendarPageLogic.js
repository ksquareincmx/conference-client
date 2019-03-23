import React, { Fragment } from "react";
import dates from "react-big-calendar/lib/utils/dates";
import { withRouter } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DraggingCalendar from "components/Modals/DraggingCalendar";
import { HeaderView } from "components/Calendar";
import * as AppointmentMapper from "mappers/AppointmentMapper";
import * as Utils from "./Utils.js";
import HeaderStrategy from "./HeaderStrategy";
import CalendarStrategy from "./CalendarStrategy";
import { Grid, withStyles } from "@material-ui/core";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { getUTCDateFilter } from "utils/BookingFilters";
import { bookingService } from "services";

const styles = theme => ({
  calendarContainer: {
    margin: "0px 5% 0px 5%"
  }
});

class CalendarPageLogicComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      events: [[], []],
      selector: "day",
      focusDate: new Date(),
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
  }

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
  handleEventView = ({ event }) => {
    return (
      <span>
        <strong>{event.title}</strong>
        {event.desc && ":  " + event.desc}
      </span>
    );
  };

  handleSelect = conferenceRoomName => event => {
    const start = event.start;
    const end = event.end;
    const appointmentInfo = {
      start: {
        hours: start.getHours(),
        minutes: start.getMinutes()
      },
      end: {
        hours: end.getHours(),
        minutes: end.getMinutes()
      },
      date: {
        day: start.getDate(),
        month: start.getMonth() + 1,
        year: start.getFullYear()
      },
      roomId: conferenceRoomName + 1,
      reasonAppointment: ""
    };
    const title = 1;

    if (title) {
      if (end < new Date()) {
        return alert(
          "La fecha de finalización no puede ser previa a la fecha actual"
        );
      }

      this.setState(prevState => {
        prevState.events[conferenceRoomName].push({
          start,
          end,
          title,
          roomId: conferenceRoomName
        });
        return {
          events: prevState.events,
          coordinates: event.bounds,
          appointmentInfo: appointmentInfo
        };
      });
    }
  };

  handlerOnClickViewButton = buttonIdentifier => () => {
    this.setState({ selector: buttonIdentifier });
  };

  handlerOnCLickTimeButton = buttonId => () => {
    let selector;

    if (this.state.selector === "work_week") {
      this.setState({ selector: "week" });
    }

    switch (buttonId) {
      case "previous":
        return this.setState(prevState => ({
          focusDate: dates.add(prevState.focusDate, -1, selector)
        }));
      case "next":
        return this.setState(prevState => ({
          focusDate: dates.add(prevState.focusDate, 1, selector)
        }));
      case "today":
        return this.setState({ focusDate: new Date() });
      default:
        return null;
    }
  };

  printAppointments = async () => {
    const bookingsList = await bookingService.getAllWithDetails(
      getUTCDateFilter()
    );
    const events = AppointmentMapper.toEvents(bookingsList.bookings);
    if (events.lenth > 0) {
      this.setState(prevState => {
        prevState.events[0].push(...events[0]);
        prevState.events[1].push(...events[1]);
        return {
          events: prevState.events
        };
      });
    }
  };

  componentDidMount() {
    this.printAppointments();
  }

  render() {
    const { calendarContainer } = this.props.classes;

    return (
      <Fragment>
        <Grid container direction="row">
          <Grid item xs={3}>
            <BookingsSideBar auth={this.props.auth} />
          </Grid>
          <Grid item xs={9}>
            <Grid container direction="column">
              <div className={calendarContainer}>
                <HeaderView
                  onClickViewButton={this.handlerOnClickViewButton}
                  headerDateContainer={
                    <HeaderStrategy
                      type={this.state.selector}
                      numberDayInMonth={this.state.focusDate.getDate()}
                      fullYear={this.state.focusDate.getFullYear()}
                      date={this.state.focusDate}
                      dayName={Utils.getNameDay(this.state.focusDate)}
                      monthName={Utils.getNameMonth(this.state.focusDate)}
                      numberWeekInYear={Utils.getWeekOfYear(
                        this.state.focusDate
                      )}
                      onClickButton={this.handlerOnCLickTimeButton}
                    />
                  }
                />
                <CalendarStrategy
                  type={this.state.selector}
                  events={this.state.events}
                  handleSelect={this.handleSelect}
                  components={{
                    event: this.handleEventView
                  }}
                  localizer={Utils.localizer}
                  minDate={Utils.minDate}
                  maxDate={Utils.maxDate}
                  step={Utils.step}
                  timeSlots={Utils.timeSlots}
                  date={this.state.focusDate}
                />

                <DraggingCalendar
                  coordinates={this.state.coordinates}
                  appointmentInfo={this.state.appointmentInfo}
                  onChange={this.handleChangeReasonAppointment}
                  onClick={this.handleClickCreateBookingDraggingCalendar}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export const CalendarPageLogic = withStyles(styles)(
  withRouter(CalendarPageLogicComponent)
);
