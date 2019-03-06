import React from "react";
import { Card, withStyles, Grid } from "@material-ui/core";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import { formatDate, formatTime } from "utils/BookingFormater";
import { BookingItemMenu } from "./BookingItemMenu";
import { ModalFormConsumer } from "providers/ModalForm";

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

const BookingItemComponent = ({
  classes: styleClasses,
  booking,
  bookingService
}) => {
  const {
    itemCard,
    container,
    gridRoomSticker,
    gridInfo,
    gridDate
  } = styleClasses;
  const { roomColor, roomNameAbbrev, userName, start, end, dateText } = booking;
  const startTime = formatTime(formatDate(start));
  const endTime = formatTime(formatDate(end));

  const handleOnDelete = async () => {
    try {
      const res = await bookingService.removeBooking(booking.id);
      if (res.ok) {
        //Temporal solution, call notification system
        alert("Appointment successfully deleted");
        return window.location.reload();
      }
      //Temporal solution, call notification system
      return alert("The deletion of the appointmen failed");
    } catch (error) {
      //Temporal solution, call notification system
      alert("There was an error with the server");
    }
  };

  const handleOnEdit = formModalFunction => () => formModalFunction(booking);

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
                handleOnDelete={handleOnDelete}
                handleOnEdit={handleOnEdit(modalForm.handleOnClickEditMeeting)}
              />
            )}
          </ModalFormConsumer>
        </Grid>
      </Grid>
    </Card>
  );
};

export const BookingItem = withStyles(styles)(BookingItemComponent);
