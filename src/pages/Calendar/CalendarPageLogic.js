import React, { Fragment } from "react";
import dates from "react-big-calendar/lib/utils/dates";
import { withRouter } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { HeaderView } from "components/Calendar";
import * as Utils from "./Utils.js";
import HeaderStrategy from "./HeaderStrategy";
import { Grid, withStyles } from "@material-ui/core";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { CalendarGrid } from "./CalendarGrid";
import { ModalFormConsumer } from "providers";

const styles = theme => ({
  calendarContainer: {
    margin: "0px 5% 0px 5%"
  }
});

class CalendarPageLogicComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selector: "day",
      focusDate: new Date()
    };
  }

  handlerOnClickViewButton = buttonIdentifier => () => {
    this.setState({
      selector: buttonIdentifier,
      focusDate: new Date()
    });
  };

  handleOnClickPrev = () => {
    const viewType = this.state.selector;
    return this.setState(prevState => ({
      focusDate: dates.add(prevState.focusDate, -1, viewType)
    }));
  };

  handleOnClickNext = () => {
    const viewType = this.state.selector;
    return this.setState(prevState => ({
      focusDate: dates.add(prevState.focusDate, 1, viewType)
    }));
  };

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
                      onClickNext={this.handleOnClickNext}
                      onClickPrev={this.handleOnClickPrev}
                    />
                  }
                />
                <ModalFormConsumer>
                  {modalForm => (
                    <CalendarGrid
                      type={this.state.selector}
                      date={this.state.focusDate}
                      onCreate={modalForm.handleOnClickCreateMeeting}
                    />
                  )}
                </ModalFormConsumer>
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
