import React from "react";
import { Card, withStyles, Grid } from "@material-ui/core";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import { formatDate, formatTime } from "utils/BookingFormater";
import { BookingItemMenu } from "./BookingItemMenu";
import { ConfirmationDialog } from "components/Modals/DeleteBooking/ConfirmationDialog";
import { ModalFormConsumer } from "providers";
import { bookingService } from "services";

const styles = theme => ({
  itemCard: {
    width: "100%",
    height: 120,
    marginBottom: 2,
    overflow: "unset"
  },
  container: {
    height: 120
  },
  gridRoomSticker: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15
  },
  gridInfo: {
    display: "flex",
    alignItems: "center"
  },
  gridDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
    color: "#A7A7A7",
    fontSize: 15
  }
});

class BookingItemComponent extends React.Component {
  state = {
    openDialog: false
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleOnDelete = async () => {
    const { booking } = this.props;
    console.log(booking);
    const { id: sessionUserId } = this.props.auth.user;
    const { user_id: bookingUserId, id: bookingId } = booking;
    console.log(sessionUserId);
    console.log(bookingUserId);
    if (sessionUserId === bookingUserId) {
      console.log("aqui");
      try {
        const res = await bookingService.deleteOneById(bookingId);
        if (res.ok) {
          //Temporal solution, call notification system
          alert("Appointment successfully deleted");
          return window.location.reload();
        }
        //Temporal solution, call notification system
        return alert("The deletion of the appointmen failed");
      } catch (error) {
        //Temporal solution, call notification system
        return alert("There was an error with the server");
      }
    }
    //Temporal solution, call notification system
    return alert("You don't have permission to delete this appointment");
  };

  handleOnEdit = formModalFunction => () =>
    formModalFunction(this.props.booking);

  render() {
    const { classes: styleClasses, booking } = this.props;
    const {
      itemCard,
      container,
      gridRoomSticker,
      gridInfo,
      gridDate
    } = styleClasses;
    const {
      roomColor,
      roomNameAbbrev,
      userName,
      start,
      end,
      dateText
    } = booking;
    const startTime = formatTime(formatDate(start));
    const endTime = formatTime(formatDate(end));
    const bookingFormated = {
      ...booking,
      startTime: startTime,
      endTime: endTime
    };
    return (
      <Card elevation={1} square className={itemCard}>
        <Grid container direction={"row"} className={container}>
          <Grid item xs={3} className={gridRoomSticker}>
            <RoomSticker roomColor={roomColor} roomName={roomNameAbbrev} />
          </Grid>
          <Grid item xs={6} className={gridInfo}>
            <BookingDetails
              userName={userName}
              startTime={startTime}
              endTime={endTime}
            />
          </Grid>
          <Grid item xs={3} className={gridDate}>
            <div>{dateText}</div>
            <ModalFormConsumer>
              {modalForm => (
                <BookingItemMenu
                  handleOnDelete={this.handleOpenDialog}
                  handleOnEdit={this.handleOnEdit(
                    modalForm.handleOnClickEditMeeting
                  )}
                />
              )}
            </ModalFormConsumer>
          </Grid>
        </Grid>
        <ConfirmationDialog
          handleClickYes={this.handleOnDelete}
          booking={bookingFormated}
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        />
      </Card>
    );
  }
}

export const BookingItem = withStyles(styles)(BookingItemComponent);
