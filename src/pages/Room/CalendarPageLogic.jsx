import React from "react";
import dates from "react-big-calendar/lib/utils/dates";
import { withRouter } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HeaderView } from "components/Calendar";
import * as Utils from "./Utils.js";
import { HeaderStrategy } from "./HeaderStrategy.jsx";
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
    selectedRooms: "",
    rooms: "",
    selectedRoom: ""
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

  handleRoomChange = selectedRoom => {
    this.props.history.push(`/room/${selectedRoom.id}`);
    window.location.reload();
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
      const selectedRoom = [];
      selectedRoom.push(
        roomList.find(room => {
          return room.id.toString() === this.props.URLRoomId;
        })
      );
      this.setState({
        pairedRooms,
        selectedRooms: pairedRooms[0],
        rooms: roomList,
        selectedRoom: selectedRoom
      });
    } catch (error) {
      this.setState({ selectedRooms: "", selectedRoom: "" });
    }
  };

  componentDidMount() {
    this.fetchRooms();
  }

  render() {
    const {
      rooms,
      pairedRooms,
      selectedRooms,
      selectedRoom,
      selector,
      focusDate
    } = this.state;
    const {
      bookingsData,
      onBookingsDataChange,
      isDrawerOpen,
      classes: styleClasses
    } = this.props;
    const { calendarContainer, contentShrink, contentExpand } = styleClasses;

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
            roomList={rooms}
            pairedRooms={pairedRooms}
            selectedRooms={selectedRooms}
            selectedRoom={selectedRoom}
            isSingleGrid={true}
            onChangeRoomSelect={this.handleRoomChange}
            headerDateContainer={
              <HeaderStrategy
                type={selector}
                numberDayInMonth={focusDate.getDate()}
                fullYear={focusDate.getFullYear()}
                date={focusDate}
                dayName={Utils.getNameDay(focusDate)}
                monthName={Utils.getNameMonth(focusDate)}
                numberWeekInYear={Utils.getWeekOfYear(focusDate)}
                onClickNext={this.handleOnClickNext}
                onClickPrev={this.handleOnClickPrev}
              />
            }
          />
          <ModalFormConsumer>
            {modalForm => {
              return (
                <CalendarGrid
                  type={selector}
                  date={focusDate}
                  selectedRooms={selectedRooms}
                  selectedRoom={selectedRoom}
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
