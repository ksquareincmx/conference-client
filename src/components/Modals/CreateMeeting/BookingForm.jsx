import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core/";
import compose from "lodash/fp/compose";
import DatePicker from "./DatePicker";
import TimeSelect from "./TimeSelect";
import RoomSelect from "./RoomSelect";
import { validateBooking } from "./meetingValidations";
import MaterialButton from "components/MaterialButton";
import ChipList from "components/ChipList";
import {
  formatDate,
  formatDashedDate,
  formatHours,
  formatMinutes
} from "utils/BookingFormater";
import addZeros from "utils/AddZeros";
import { mapToNotificationContentFormat } from "mappers/bookingMapper";
import { bookingService } from "services";
import { withNotifications } from "hocs";

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    maxWidth: 500,
    borderRadius: 5,
    maxHeight: 760
  },
  root: {
    flexGrow: 1
  },
  header: {
    fontSize: 40,
    color: "#5094E3"
  },
  content: {
    padding: theme.spacing.unit * 1.5
  },
  subtitle: {
    fontWeight: "bold",
    color: "#1E90FF"
  },
  alertMessage: {
    color: "red"
  },
  helpText: {
    color: "#636363",
    fontWeight: "bold",
    fontSize: 15
  }
});

class BookingFormComponent extends React.Component {
  state = {
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    bookingReason: "",
    attendees: [],
    invalidWeekendMessage: "",
    invalidDateMessage: "",
    invalidHourMessage: "",
    disabledEndTimeSelect: true,
    disabledStartTimeSelect: true,
    disabledConferenceSelect: true,
    disabledNextButton: true,
    disabledDate: false,
    quickAppointment: false,
    isBookingEdition: false,
    refreshChipList: false,
    isInvalidDate: false,
    isInvalidHour: false,
    isInvalidReason: false,
    isInvalidInvite: false
  };

  enableStartTimeSelect = () => {
    this.setState({ disabledStartTimeSelect: false });
  };

  enableEndTimeSelect = () => {
    this.setState({ disabledEndTimeSelect: false });
  };

  enableConferenceSelect = () => {
    this.setState({ disabledConferenceSelect: false });
  };

  enableNextButton = () => {
    this.setState({ disabledNextButton: false });
  };

  setBookingStartTime = startTime => {
    this.setState({ startTime }, () => this.enableEndTimeSelect());
  };

  setBookingEndTime = endTime => {
    this.setState({ endTime }, () => this.verifyQuickAppointment());
  };

  verifyQuickAppointment = () => {
    if (this.props.quickAppointment) {
      return this.enableNextButton();
    }
    this.enableConferenceSelect();
  };

  setRoom = room => {
    this.setState({ roomId: room }, () => this.enableNextButton());
  };

  setDate = date => {
    this.setState({ date: date.target.value }, () =>
      this.enableStartTimeSelect()
    );
  };

  refreshChipList = () => {
    this.setState({ refreshChipList: !this.state.refreshChipList });
  };

  validate = bookingObj => {
    const bookingValidated = validateBooking(bookingObj);
    this.setState({
      ...bookingValidated.InfoValidations
    });
    return bookingValidated.isValidBooking;
  };

  handleBookingOperation = async () => {
    const { isBookingEdition } = this.state;
    const booking = postDto(this.state);
    const isBookingValid = this.validate(booking);
    const {
      onSuccessNotification,
      onErrorNotification,
      onModalClose,
      onBookingsDataChange
    } = this.props;

    try {
      if (isBookingValid) {
        if (isBookingEdition) {
          const { bookingForEdition } = this.props;
          const { id } = bookingForEdition;
          const bookingInfo = await this.doBookingEdition(id, booking);
          onModalClose();
          onSuccessNotification({
            bookingInfo,
            notificationType: "edit"
          });
          onBookingsDataChange();
          return;
        }
        const bookingInfo = await this.doBookingCreation(booking);
        onModalClose();
        onSuccessNotification({
          bookingInfo,
          notificationType: "create"
        });
        onBookingsDataChange();
        return;
      }
    } catch (error) {
      const { title, body } = error;
      onErrorNotification({
        title,
        body
      });
      return;
    }
  };

  doBookingCreation = async bookingInfo => {
    try {
      const bookingCreated = await bookingService.createOne(bookingInfo);
      const { id } = bookingCreated;
      if (id) {
        const bookingInfo = mapToNotificationContentFormat(bookingCreated);
        return bookingInfo;
      }

      return alert(bookingCreated);
    } catch (error) {
      return Promise.reject({
        title: "Booking creation fail's",
        body: "There was an error with the server"
      });
    }
  };

  doBookingEdition = async (id, bookingInfo) => {
    try {
      const bookingEdited = await bookingService.updateOneById(id, bookingInfo);
      const { id: bookingEditedId } = bookingEdited;
      if (bookingEditedId) {
        return mapToNotificationContentFormat(bookingEdited);
      }
      // Can't edit for problems with the date or the schedule
      // Change this for form validation
      return alert(bookingEdited);
    } catch (error) {
      return Promise.reject({
        title: "Booking edition fail's",
        body: "There was an error with the server"
      });
    }
  };

  handleChangeReason = event => {
    this.setState({ bookingReason: event.target.value });
  };

  handleChangeInvite = attendeesList => {
    this.setState({ attendees: attendeesList });
  };

  getDate = () => {
    const date = new Date();
    const day = addZeros(date.getDate());
    const month = addZeros(date.getMonth() + 1);
    const year = String(date.getFullYear());

    return year + "-" + month + "-" + day;
  };

  componentDidMount() {
    let date = "";

    if (this.props.quickAppointment) {
      if (!this.state.quickAppointment) {
        const { start, end, roomName, roomId } = this.props.bookingForEdition;
        const startDate = formatDate(start);
        const endDate = formatDate(end);

        this.setState({
          quickAppointment: true,
          room: roomName,
          roomId: roomId,
          date: formatDashedDate(startDate),
          startTime: {
            hour: formatHours(startDate),
            minute: formatMinutes(startDate)
          },
          endTime: {
            hour: formatHours(endDate),
            minute: formatMinutes(endDate)
          },
          disabledStartTimeSelect: false,
          disabledEndTimeSelect: false,
          disabledConferenceSelect: false,
          disabledNextButton: roomName ? false : true
        });
      }
    } else if (this.props.isBookingEdition) {
      if (!this.state.isBookingEdition) {
        const { bookingForEdition, roomId, roomName } = this.props;
        const { start, end, room, description, attendees } = bookingForEdition;

        const startDate = formatDate(start);
        const endDate = formatDate(end);

        this.setState({
          room: roomName,
          roomId: roomId,
          isBookingEdition: true,
          date: formatDashedDate(startDate),
          startTime: {
            hour: formatHours(startDate),
            minute: formatMinutes(startDate)
          },
          endTime: {
            hour: formatHours(endDate),
            minute: formatMinutes(endDate)
          },
          bookingReason: description,
          attendees: attendees,
          disabledStartTimeSelect: false,
          disabledEndTimeSelect: false,
          disabledConferenceSelect: false,
          disabledNextButton: false
        });

        this.refreshChipList();
      }
    }
  }

  render() {
    const { isBookingEdition, classes: styleClasses } = this.props;
    const {
      card,
      root,
      header,
      content,
      subtitle,
      alertMessage,
      helpText
    } = styleClasses;

    const formTitle = isBookingEdition ? "Edit Appointment" : "New Appointment";
    const buttonSaveTxt = isBookingEdition ? "Edit" : "Create";

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Card className={card}>
          <CardHeader classes={{ title: header }} title={formTitle} />
          <Divider />
          <CardContent className={root}>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Reservation Date
              </Typography>
              <DatePicker
                setDate={this.setDate}
                disabled={this.state.disabledDate}
                date={this.state.date}
                isInvalidDate={this.state.isInvalidDate}
              />
              <Collapse in={this.state.isInvalidDate}>
                <small className={alertMessage}>
                  {this.state.invalidWeekendMessage !== "" ? (
                    <Fragment>
                      {this.state.invalidWeekendMessage}
                      <br />
                      {this.state.invalidDateMessage}
                    </Fragment>
                  ) : (
                    <Fragment>{this.state.invalidDateMessage}</Fragment>
                  )}
                </small>
              </Collapse>
            </Grid>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Reservation Time
              </Typography>
              <Grid container direction="row">
                <Grid item xs={6}>
                  <span className={helpText}>From</span>
                  <TimeSelect
                    disabledHour={this.state.disabledStartTimeSelect}
                    setTime={this.setBookingStartTime}
                    startTime={this.state.startTime}
                    isInvalidHour={this.state.isInvalidHour}
                  />
                </Grid>
                <Grid item xs={6}>
                  <span className={helpText}>To</span>
                  <TimeSelect
                    disabledHour={this.state.disabledEndTimeSelect}
                    setTime={this.setBookingEndTime}
                    endTime={this.state.endTime}
                    isInvalidHour={this.state.isInvalidHour}
                  />
                </Grid>
              </Grid>
              <Collapse in={this.state.isInvalidHour}>
                <small className={alertMessage}>
                  {this.state.invalidHourMessage}
                </small>
              </Collapse>
            </Grid>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Conference Room
              </Typography>
              <RoomSelect
                disabled={this.state.disabledConferenceSelect}
                setRoom={this.setRoom}
                room={this.state.room}
                roomId={this.state.roomId}
              />
            </Grid>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Reason for the Appointment
              </Typography>
              <TextField
                placeholder="Reason"
                fullWidth
                onChange={this.handleChangeReason}
                InputLabelProps={{
                  shrink: true
                }}
                error={this.state.isInvalidReason}
                value={this.state.bookingReason}
              />
              <Collapse in={this.state.isInvalidReason}>
                <small className={alertMessage}>Reason can not be empty</small>
              </Collapse>
            </Grid>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Invite People
              </Typography>
              <ChipList
                handleChangeInvite={this.handleChangeInvite}
                attendeesList={this.state.attendees}
                isInvalidInvite={this.state.isInvalidInvite}
                refresh={this.state.refreshChipList}
              />
              <Fragment>
                <Collapse in={this.state.isInvalidInvite}>
                  <small className={alertMessage}>
                    You need to invite at least one person
                  </small>
                </Collapse>
              </Fragment>
            </Grid>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <MaterialButton
              textButton="Back"
              sizeButton="large"
              colorButton="#909497"
              onClick={this.props.onModalClose}
            />
            <MaterialButton
              textButton={buttonSaveTxt}
              sizeButton="large"
              colorButton="#5094E3"
              onClick={this.handleBookingOperation}
              disabled={this.state.disabledNextButton}
            />
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const postDto = newBooking => {
  const {
    bookingReason,
    roomId,
    date,
    startTime,
    endTime,
    attendees
  } = newBooking;

  return {
    roomId,
    attendees,
    description: bookingReason,
    start: `${date}T${startTime.hour}:${startTime.minute}:00.000-06:00`,
    end: `${date}T${endTime.hour}:${endTime.minute}:00.000-06:00`
  };
};

const withContexts = compose(
  withStyles(styles),
  withRouter,
  withNotifications
);
export const BookingForm = withContexts(BookingFormComponent);
