import React from "react";
import { Card, Grid, CardContent } from "@material-ui/core/";
import Divider from "@material-ui/core/Divider";
import TimeSelect from "./TimeSelect";
import RoomSelect from "./RoomSelect";
import TextField from "@material-ui/core/TextField";
import MaterialButton from "components/MaterialButton";
import ChipList from "components/ChipList/";
import DatePicker from "./DatePicker";

class AppointmentList extends React.Component {
  styles = {
    card: {
      backgroundColor: "#fefefe",
      width: 700,
      maxWidth: 700,
      minHeight: 600,
      borderRadius: 25,
      padding: 20,
      display: "flex",
      flexDirection: "column"
    },

    header: {
      fontSize: 40,
      color: "#5094E3",
      fontFamily: "roboto"
    },

    cardContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }
  };

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
    reasonAppoointmentText: "",
    attendees: []
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

  handleClickNext = async () => {
    const post = postDto(this.state);

    if (this.state.bookingClicked) {
      const res = await this.props.booking.modifyBooking(
        post,
        this.props.bookingClickedObj.bookingId
      );
      window.location.href = "/calendar";
      return 0;
    }
    const res = await this.props.booking.createNewBooking(post);
    window.location.href = "/calendar";
  };

  handleChangeReason = event => {
    this.setState({ reasonAppoointmentText: event.target.value });
  };

  addZeros = number => {
    if (number < 10) {
      return "0" + String(number);
    }
    return String(number);
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
        const startDateFormat = this.props.bookingClickedObj.start.slice(
          0,
          this.props.bookingClickedObj.start.length - 1
        );
        const startDate = new Date(startDateFormat);

        const endDateFormat = this.props.bookingClickedObj.end.slice(
          0,
          this.props.bookingClickedObj.end.length - 1
        );
        const endDate = new Date(endDateFormat);

        let date =
          startDate.getFullYear() +
          "-" +
          addZeros(startDate.getMonth() + 1) +
          "-" +
          addZeros(startDate.getDate());

        this.setState({
          room: this.props.bookingClickedObj.roomName,
          roomId: this.props.bookingClickedObj.roomId,
          bookingClicked: true,
          date: date,
          startTime: {
            hour: addZeros(startDate.getHours()),
            minute: addZeros(startDate.getMinutes())
          },

          endTime: {
            hour: addZeros(endDate.getHours()),
            minute: addZeros(endDate.getMinutes())
          },
          disabledStartTimeSelect: false,
          disabledEndTimeSelect: false,
          disabledConferenceSelect: false,
          disabledNextButton: false
        });
      }
    }
  }

  render() {
    let date = (
      <DatePicker
        setDate={this.setDate}
        disabled={this.state.disabledDate}
        date={this.state.date}
      />
    );
    let room = this.props.room;
    if (this.state.bookingClicked) {
      room = this.props.bookingClickedObj.roomName;
    }
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Card style={this.styles.card}>
          <div>
            <header style={this.styles.header}>Appointment List</header>
            <Divider />
          </div>

          <CardContent style={this.styles.cardContent}>
            <div style={{ fontWeight: "bold" }}> Reservation date </div>
            <Grid container direction="row">
              {date}
            </Grid>

            <div style={{ fontWeight: "bold" }}>Reservation time</div>
            <Grid container direction="row">
              <TimeSelect
                disabledHour={this.state.disabledStartTimeSelect}
                SetTime={this.setBookingStartTime}
                startTime={this.state.startTime}
              />
              <TimeSelect
                disabledHour={this.state.disabledEndTimeSelect}
                SetTime={this.setBookingEndTime}
                endTime={this.state.endTime}
              />
            </Grid>

            <div style={{ fontWeight: "bold" }}> Conference Room </div>
            <RoomSelect
              disabled={this.state.disabledConferenceSelect}
              setRoom={this.setRoom}
              room={room}
              roomService={this.props.roomService}
            />

            <div style={{ fontWeight: "bold" }}>Reason for the Appointment</div>
            <TextField
              id="standard-full-width"
              style={{ margin: 8 }}
              placeholder="Reason"
              fullWidth
              margin="normal"
              onChange={this.handleChangeReason}
              InputLabelProps={{
                shrink: true
              }}
            />
          </CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: 30
            }}
          >
            <ChipList />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MaterialButton
              textButton="Back"
              onClick={this.props.handleOnCloseModal}
              colorButton="#1F599D"
            />

            <MaterialButton
              textButton="Next"
              colorButton="#5094E3"
              onClick={this.handleClickNext}
              disabled={this.state.disabledNextButton}
            />
          </div>
        </Card>
      </Grid>
    );
  }
}

function addZeros(number) {
  if (number < 10) {
    return "0" + String(number);
  }
  return String(number);
}

function postDto(state) {
  return {
    description: state.reasonAppoointmentText,
    roomId: state.roomId,
    start:
      state.date +
      "T" +
      state.startTime.hour +
      ":" +
      state.startTime.minute +
      ":" +
      "00.000Z",
    end:
      state.date +
      "T" +
      state.endTime.hour +
      ":" +
      state.endTime.minute +
      ":" +
      "00.000Z",
    attendees: [...state.attendees]
  };
}

export default AppointmentList;
