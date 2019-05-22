import React from "react";
import dates from "react-big-calendar/lib/utils/dates";
import { withRouter } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HeaderView } from "components/Calendar";
import * as Utils from "./Utils.js";
import HeaderStrategy from "./HeaderStrategy";
import { roomService } from "services";
import { Grid, withStyles } from "@material-ui/core";
import { CalendarGrid } from "./CalendarGrid";
import { ModalFormConsumer } from "providers";
import { EasterEgg } from "./components/EasterEgg";
import classNames from "classnames";

const styles = theme => ({
  calendarContainer: {
    margin: "64px 5% 64px 5%"
  },
  contentShrink: {
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: "36vw"
  },
  contentExpand: {
    transition: theme.transitions.create("margin-left", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: "5%"
  }
});

class CalendarPageLogicComponent extends React.Component {
  state = {
    selector: "day",
    focusDate: new Date(),
    selectedRooms: ""
  };

  handlerOnClickViewButton = buttonIdentifier => () => {
    this.setState({
      selector: buttonIdentifier,
      focusDate: new Date()
    });
  };

  handleOnClickPrev = () => {
    const viewType = this.state.selector;
    return this.setState(prevState => {
      return {
        focusDate: dates.add(prevState.focusDate, -1, viewType)
      };
    });
  };

  handleOnClickNext = () => {
    const viewType = this.state.selector;
    return this.setState(prevState => ({
      focusDate: dates.add(prevState.focusDate, 1, viewType)
    }));
  };

  handleRoomChange = selectedRooms => {
    this.setState({
      selectedRooms
    });
  };

  fetchRooms = async () => {
    try {
      const roomList = await roomService.getAll();
      if (roomList.length === 0) {
        return this.props.handleDBEmpty();
      }
      const ROOMS_PER_CALENDAR = 2;
      const pairedRooms = roomList.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + ROOMS_PER_CALENDAR));
        }
        return result;
      }, []);
      this.setState({ pairedRooms, selectedRooms: pairedRooms[0] });
    } catch (error) {
      this.setState({ selectedRooms: "" });
    }
  };

  componentDidMount() {
    this.fetchRooms();
  }

  render() {
    const {
      calendarContainer,
      contentShrink,
      contentExpand
    } = this.props.classes;
    const { bookingsData, onBookingsDataChange, isDrawerOpen } = this.props;

    return (
      <Grid container direction="column">
        <div
          className={classNames(calendarContainer, {
            [contentShrink]: isDrawerOpen,
            [contentExpand]: !isDrawerOpen
          })}
        >
          <HeaderView
            onClickViewButton={this.handlerOnClickViewButton}
            pairedRooms={this.state.pairedRooms}
            selectedRooms={this.state.selectedRooms}
            onChangeRoomSelect={this.handleRoomChange}
            headerDateContainer={
              <HeaderStrategy
                type={this.state.selector}
                numberDayInMonth={this.state.focusDate.getDate()}
                fullYear={this.state.focusDate.getFullYear()}
                date={this.state.focusDate}
                dayName={Utils.getNameDay(this.state.focusDate)}
                monthName={Utils.getNameMonth(this.state.focusDate)}
                numberWeekInYear={Utils.getWeekOfYear(this.state.focusDate)}
                onClickNext={this.handleOnClickNext}
                onClickPrev={this.handleOnClickPrev}
              />
            }
          />
          <ModalFormConsumer>
            {modalForm => {
              return (
                <CalendarGrid
                  type={this.state.selector}
                  date={this.state.focusDate}
                  selectedRooms={this.state.selectedRooms}
                  bookingsData={bookingsData}
                  onBookingsDataChange={onBookingsDataChange}
                  onCreate={modalForm.handleOnClickCreateMeeting}
                />
              );
            }}
          </ModalFormConsumer>
          <EasterEgg />
        </div>
      </Grid>
    );
  }
}

export const CalendarPageLogic = withStyles(styles)(
  withRouter(CalendarPageLogicComponent)
);
