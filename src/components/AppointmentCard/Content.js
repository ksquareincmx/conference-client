import React from "react";
import CardContent from "@material-ui/core/CardContent";
import RoomList from "./RoomList/";
import Button from "../../components/MaterialButton";
import BookingList from "./BookingList/";
import Modal from "@material-ui/core/Modal";
import AppointmentList from "../Modals/CreateMeeting/";
import "./AppointmentCard.css";
import { Grid } from "@material-ui/core/";
import { withRouter } from "react-router-dom";

class Content extends React.Component {
  state = {
    openModal: false,
    room: undefined,
    quickAppointment: false,
    bookingClicked: false,
    bookingClickedObj: ""
  };

  handleOnClickCreateMeeting = event => {
    this.setState({ 
      openModal: true, 
      room: undefined,
      quickAppointment: false,
      roomId: null,
    });
  };

  handleOnCloseModal = event => {
    this.setState({ openModal: false });
  };

  handleClickQuickAppointment = (roomName, roomId) => event => {
    this.setState({
      openModal: true,
      room: roomName,
      quickAppointment: true,
      roomId: roomId
    });
  };

  handleClickCalendar = () => {
    this.props.history.push("/calendar");
  };

  handleClickBooking = booking => event => {
    if (this.props.auth.user.id === booking.user_id) {
      this.setState({
        openModal: true,
        bookingClicked: true,
        bookingClickedObj: booking
      });
    }
  };

  render() {
    const styles = getStyles();
    return (
      <CardContent style={styles.appointmentCardContainer}>
        <Grid container style={styles.appointmentCardGrid}>
          <Grid item xs={6}>
            <BookingList
              booking={this.props.booking}
              userService={this.props.userService}
              roomService={this.props.roomService}
              clicked={this.handleClickBooking}
              auth={this.props.auth}
            />
          </Grid>

          <Grid item xs={6} style={styles.appointmentLeftGrid}>
            <Modal
              open={this.state.openModal}
              onClose={this.handleClose}
              disableAutoFocus={true}
              style={styles.modal}
            >
              <AppointmentList
                handleOnCloseModal={this.handleOnCloseModal}
                booking={this.props.booking}
                bookingClicked={this.state.bookingClicked}
                bookingClickedObj={this.state.bookingClickedObj}
                roomService={this.props.roomService}
                room={this.state.room}
                roomId={this.state.roomId}
                quickAppointment={this.state.quickAppointment}
              />
            </Modal>
            <div style={styles.roomList}>
              <RoomList
                roomService={this.props.roomService}
                onClick={this.handleClickQuickAppointment}
              />
            </div>

            <div style={styles.buttons}>
              <Button
                textButton="Go to the calendar"
                colorButton="#1F599D"
                onClick={this.handleClickCalendar}
              />

              <Button
                textButton="Create Meeting "
                colorButton="#4A90E2"
                onClick={this.handleOnClickCreateMeeting}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}

const getStyles = () => ({
  appointmentCardContainer: {
    height: "95%",
    width: "100%"
  },
  appointmentCardGrid: {
    height: "100%",
    width: "100%",
    marginBottom: 16
  },
  appointmentLeftGrid: {
    width: 500,
    borderLeftWidth: 2,
    borderLeftColor: "gray",
    borderLeftStyle: "solid"
  },
  modal: {
    width: "100%",
    height: "100%"
  },
  roomList: {
    marginLeft: 20
  },
  buttons: {
    marginTop: 40
  }
});

export default withRouter(Content);
