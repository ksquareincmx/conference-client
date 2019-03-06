import React, { Fragment } from "react";
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
import MaterialButton from "components/MaterialButton";
import ChipList from "components/ChipList/";
import DatePicker from "./DatePicker";
import TimeSelect from "./TimeSelect";
import RoomSelect from "./RoomSelect";
import addZeros from "../../../utils/AddZeros";
import { validateBooking } from "./meetingValidations";
import {
  formatDate,
  formatDashedDate,
  formatHours,
  formatMinutes
} from "../../../utils/BookingFormater";

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
    disabledEndTimeSelect: true,
    disabledStartTimeSelect: true,
    disabledConferenceSelect: true,
    disabledNextButton: true,
    disabledDate: false,
    quickAppointment: false,
    bookingClicked: false,
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    reasonAppointmentText: "",
    attendees: [],
    refreshChipList: false,
    isInvalidDate: false,
    isInvalidHour: false,
    isInvalidReason: false,
    isInvalidInvite: false,
    invalidWeekendMessage: "",
    invalidDateMessage: "",
    invalidHourMessage: ""
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
    this.setState({ startTime: startTime }, () => this.enableEndTimeSelect());
  };

  setBookingEndTime = endTime => {
    this.setState({ endTime: endTime }, () => this.verifyQuickAppointment());
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
      ...bookingValidated.specificValidations
    });

    return bookingValidated.isValidBooking;
  };

  handleClickNext = async () => {
    const post = postDto(this.state);
    let isBookingValid = this.validate(post);

    if (isBookingValid) {
      if (this.state.bookingClicked) {
        try {
          const res = await this.props.booking.modifyBooking(
            post,
            this.props.bookingClickedObj.id
          );
          console.log(res);
          if (res.id) {
            this.props.handleOnCloseModal();
            window.location.href = "/calendar";
            // Temporal solution, should be handled by notification system
            return alert("Appointment edited successfully");
          }
          return alert(res);
        } catch (error) {
          return alert(error.message);
        }
      }
      try {
        const res = await this.props.booking.createNewBooking(post);
        if (res.id) {
          this.props.handleOnCloseModal();
          window.location.reload();
          //Temporal solution,it should redirect to /booking:id
          return alert(
            "id: " +
              res.id +
              " " +
              "Start date: " +
              res.start +
              " " +
              "End date: " +
              res.end +
              " " +
              "Reason: " +
              res.description
          );
        }
        alert(res);
      } catch (error) {
        alert(error);
      }
    }
  };

  handleChangeReason = event => {
    this.setState({ reasonAppointmentText: event.target.value });
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
      date = this.getDate();
      if (!this.state.quickAppointment) {
        this.setState({
          quickAppointment: true,
          disabledDate: true,
          date: date,
          disabledStartTimeSelect: false,
          roomId: this.props.roomId
        });
      }
    } else if (this.props.bookingClicked) {
      if (!this.state.bookingClicked) {
        const {
          start,
          end,
          roomName,
          room_id: roomId,
          description,
          attendees
        } = this.props.bookingClickedObj;

        const startDate = formatDate(start);
        const endDate = formatDate(end);

        this.setState({
          room: roomName,
          roomId: roomId,
          bookingClicked: true,
          date: formatDashedDate(startDate),
          startTime: {
            hour: formatHours(startDate),
            minute: formatMinutes(startDate)
          },
          endTime: {
            hour: formatHours(endDate),
            minute: formatMinutes(endDate)
          },
          reasonAppointmentText: description,
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
    const {
      card,
      root,
      header,
      content,
      subtitle,
      alertMessage,
      helpText
    } = this.props.classes;

    let date = (
      <DatePicker
        setDate={this.setDate}
        disabled={this.state.disabledDate}
        date={this.state.date}
        isInvalidDate={this.state.isInvalidDate}
      />
    );

    let room = this.props.room;
    if (this.state.bookingClicked) {
      room = this.props.bookingClickedObj.roomName;
    }

    const formTitle = this.props.bookingClicked
      ? "Edit Meeting"
      : "New Meeting";

    const buttonSaveTxt = this.props.bookingClicked ? "Edit" : "Create";

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
              {date}
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
                room={room}
                roomService={this.props.roomService}
              />
            </Grid>
            <Grid container direction="column" className={content}>
              <Typography className={subtitle} variant="subtitle1">
                Reason for the Appointment
              </Typography>
              <TextField
                id="standard-full-width"
                placeholder="Reason"
                fullWidth
                onChange={this.handleChangeReason}
                InputLabelProps={{
                  shrink: true
                }}
                error={this.state.isInvalidReason}
                value={this.state.reasonAppointmentText}
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
              onClick={this.props.handleOnCloseModal}
            />
            <MaterialButton
              textButton={buttonSaveTxt}
              sizeButton="large"
              colorButton="#5094E3"
              onClick={this.handleClickNext}
              disabled={this.state.disabledNextButton}
            />
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

function postDto(state) {
  return {
    description: state.reasonAppointmentText,
    roomId: state.roomId,
    start:
      state.date +
      "T" +
      state.startTime.hour +
      ":" +
      state.startTime.minute +
      ":" +
      "00.000-06:00",
    end:
      state.date +
      "T" +
      state.endTime.hour +
      ":" +
      state.endTime.minute +
      ":" +
      "00.000-06:00",
    attendees: [...state.attendees]
  };
}

export const BookingForm = withStyles(styles)(BookingFormComponent);
