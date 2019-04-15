import React from "react";
import { Card, withStyles, Grid } from "@material-ui/core";
import compose from "lodash/fp/compose";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import { BookingItemMenu } from "./BookingItemMenu";
import { BookingOptionsButton } from "./BookingOptionsButton";
import {
  mapToNotificationContentFormat,
  mapToConfirmationDialogFormat
} from "mappers/bookingMapper";
import { ModalFormConsumer } from "providers";
import { bookingService, storageService } from "services";
import { withNotifications } from "hocs";
import { ConfirmationDialog } from "components/Modals/DeleteBooking/ConfirmationDialog";

const styles = theme => ({
  itemCard: {
    width: "100%",
    height: 120,
    marginBottom: 2,
    overflow: "unset"
  },
  bookingContainer: {
    height: 120
  },
  roomStickerGrid: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15
  },
  bookingInfoGrid: {
    display: "flex",
    alignItems: "center"
  },
  bookingDateGrid: {
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
    anchorEl: null,
    isDialogOpen: false,
    isLoading: false
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDialogOpen = () => {
    this.handleMenuClose();
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleBookingDeleteOperation = async () => {
    const {
      onSuccessNotification,
      onErrorNotification,
      onBookingsDataChange
    } = this.props;
    try {
      const bookingInfo = await this.doBookingDelete();
      this.handleDialogClose();
      onSuccessNotification({
        bookingInfo,
        notificationType: "delete"
      });
      onBookingsDataChange();
      return;
    } catch (error) {
      const { title, body } = error;
      onErrorNotification({
        title,
        body
      });
      return;
    }
  };

  doBookingDelete = async () => {
    const { booking, onErrorNotification } = this.props;
    const { userId, bookingId } = booking;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      try {
        this.setState({ isLoading: true });
        const deleteResponse = await bookingService.deleteOneById(bookingId);
        const { ok } = deleteResponse;
        if (ok) {
          return mapToNotificationContentFormat(booking);
        }

        // TODO: Check this kind fo errors
        return alert(deleteResponse);
      } catch (error) {
        return Promise.reject({
          title: "Booking delete fail's",
          body: "There was an error with the server"
        });
      }
    }
    return onErrorNotification({
      title: "Appointment delete failed",
      body: "Action not allowed"
    });
  };

  handleBookingEditOperation = openBookingEditModal => () => {
    this.handleMenuClose();
    const { booking } = this.props;
    openBookingEditModal(booking);
  };

  render() {
    const { anchorEl, isDialogOpen, isLoading } = this.state;
    const { classes: styleClasses, booking } = this.props;
    const {
      itemCard,
      bookingContainer,
      roomStickerGrid,
      bookingInfoGrid,
      bookingDateGrid
    } = styleClasses;

    const { userName, roomColor, roomNameAbbrev, dateText } = booking;
    const bookingForDialog = mapToConfirmationDialogFormat(booking);
    const { startTime, endTime } = bookingForDialog;

    return (
      <Card elevation={1} square className={itemCard}>
        <Grid container direction={"row"} className={bookingContainer}>
          <Grid item xs={3} className={roomStickerGrid}>
            <RoomSticker roomName={roomNameAbbrev} roomColor={roomColor} />
          </Grid>
          <Grid item xs={6} className={bookingInfoGrid}>
            <BookingDetails
              userName={userName}
              startTime={startTime}
              endTime={endTime}
            />
          </Grid>
          <Grid item xs={3} className={bookingDateGrid}>
            {dateText}
            <BookingOptionsButton onClick={this.handleMenuOpen} />
            <ModalFormConsumer>
              {modalForm => (
                <BookingItemMenu
                  anchorEl={anchorEl}
                  onClose={this.handleMenuClose}
                  onBookingDelete={this.handleDialogOpen}
                  onBookingEdit={this.handleBookingEditOperation(
                    modalForm.handleOnClickEditMeeting
                  )}
                />
              )}
            </ModalFormConsumer>
          </Grid>
        </Grid>
        <ConfirmationDialog
          isLoading={isLoading}
          isOpen={isDialogOpen}
          bookingInfo={bookingForDialog}
          onConfirmation={this.handleBookingDeleteOperation}
          onCancel={this.handleDialogClose}
        />
      </Card>
    );
  }
}

const withContexts = compose(
  withStyles(styles),
  withNotifications
);
export const BookingItem = withContexts(BookingItemComponent);
