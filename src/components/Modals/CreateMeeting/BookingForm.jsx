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
  withStyles,
  CircularProgress
} from "@material-ui/core/";
import compose from "lodash/fp/compose";
import DatePicker from "./DatePicker";
import TimeSelect from "./TimeSelect";
import { RoomSelect } from "./RoomSelect";
import { validateBooking } from "./meetingValidations";
import MaterialButton from "components/MaterialButton";
import ChipList from "components/ChipList";
import {
  formatDate,
  formatDashedDate,
  formatHours,
  formatMinutes,
  formatToday
} from "utils/BookingFormater";
import { mapToPost } from "mappers/AppointmentMapper";
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
    maxHeight: 760,
    overflowY: "auto"
  },
  root: {
    flexGrow: 1
  },
  header: {
    fontSize: "1.8em",
    color: "#5094E3"
  },
  content: {
    padding: theme.spacing(1.5)
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
  },
  saveBtnWrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  btnProgress: {
    color: "blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -18,
    marginLeft: -12
  }
});

class BookingFormComponent extends React.Component {
  state = {
    date: formatDashedDate(formatToday()),
    startTime: "",
    endTime: "",
    room: "",
    bookingReason: "",
    attendees: [],
    invalidWeekendMessage: "",
    invalidDateMessage: "",
    invalidHourMessage: "",
    disabledEndTimeSelect: true,
    disabledStartTimeSelect: false,
    disabledConferenceSelect: true,
    disabledNextButton: true,
    disabledDate: false,
    quickAppointment: false,
    isBookingEdition: false,
    refreshChipList: false,
    isInvalidDate: false,
    isInvalidHour: false,
    isInvalidReason: false,
    isInvalidInvite: false,
    isInviteEmpty: true,
    isLoading: false
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
    this.setState({ date: formatDashedDate(date) }, () => this.enableStartTimeSelect());
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
    const { isBookingEdition, isInviteEmpty } = this.state;
    const booking = mapToPost(this.state);
    const isBookingValid = this.validate(booking);
    const { onErrorNotification } = this.props;
    this.setState({ isLoading: true, isInvalidInvite: false });

    try {
      if (isBookingValid && isInviteEmpty) {
        if (isBookingEdition) {
          const { bookingForEdition } = this.props;
          const { id } = bookingForEdition;
          const bookingInfo = await this.doBookingEdition(id, booking);
          return this.saveBookingResponse(bookingInfo, isBookingEdition);
        }
        const bookingInfo = await this.doBookingCreation(booking);
        return this.saveBookingResponse(bookingInfo, isBookingEdition);
      }
      return this.setState({
        isLoading: false,
        isInvalidInvite: !isInviteEmpty
      });
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
        return mapToNotificationContentFormat(bookingCreated);
      }
      return bookingCreated;
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
      return bookingEdited;
    } catch (error) {
      return Promise.reject({
        title: "Booking edition fail's",
        body: "There was an error with the server"
      });
    }
  };

  saveBookingResponse = (bookingInfo, isEdit) => {
    const {
      onSuccessNotification,
      onModalClose,
      onBookingsDataChange,
      onErrorNotification
    } = this.props;
    if (bookingInfo.userName) {
      onModalClose();
      onSuccessNotification({
        bookingInfo,
        notificationType: isEdit ? "edit" : "create"
      });
      return onBookingsDataChange();
    }
    if (bookingInfo.message === "POST error" || bookingInfo.message === "PUT error") {
      onModalClose();
      return onErrorNotification({
        title: "Action failed",
        body: "There was an error with the server"
      });
    }
    return this.setState({
      isLoading: false,
      isInvalidHour: true,
      invalidHourMessage: "This room is booked in this time"
    });
  };

  handleChangeReason = event => {
    this.setState({ bookingReason: event.target.value });
  };

  handleChangeInviteField = isEmpty => {
    this.setState({ isInviteEmpty: isEmpty });
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

        return this.setState({
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

        return this.refreshChipList();
      }
    }
    const { roomName, roomId } = this.props.bookingForEdition;

    this.setState({
      room: roomName,
      roomId: roomId,
      disabledStartTimeSelect: false,
      disabledConferenceSelect: false,
      disabledNextButton: roomName ? false : true
    });
  }

  render() {
    const { isLoading } = this.state;
    const { isBookingEdition, classes: styleClasses } = this.props;
    const {
      card,
      root,
      header,
      content,
      subtitle,
      alertMessage,
      helpText,
      saveBtnWrapper,
      btnProgress
    } = styleClasses;

    const formTitle = isBookingEdition ? "Edit Appointment" : "New Appointment";
    const buttonSaveTxt = isBookingEdition ? "Edit" : "Create";

    return (
      <Grid container justify="center" alignItems="center" style={{ height: "100%" }}>
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
                <small className={alertMessage}>{this.state.invalidHourMessage}</small>
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
                handleChangeInviteField={this.handleChangeInviteField}
                attendeesList={this.state.attendees}
                isInvalidInvite={this.state.isInvalidInvite}
                refresh={this.state.refreshChipList}
              />
            </Grid>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <MaterialButton
              textButton="Back"
              sizeButton="large"
              colorButton="#909497"
              onClick={this.props.onModalClose}
            />
            <div className={saveBtnWrapper}>
              <MaterialButton
                textButton={buttonSaveTxt}
                sizeButton="large"
                colorButton="#5094E3"
                onClick={this.handleBookingOperation}
                disabled={this.state.disabledNextButton || isLoading}
              />
              {isLoading && <CircularProgress size={24} className={btnProgress} />}
            </div>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const withContexts = compose(
  withStyles(styles),
  withRouter,
  withNotifications
);
export const BookingForm = withContexts(BookingFormComponent);
