import React from "react";
import { Card, withStyles, Grid } from "@material-ui/core";
import compose from "lodash/fp/compose";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import { BookingItemMenu } from "./BookingItemMenu";
import { BookingOptionsButton } from "./BookingOptionsButton";
import { mapToConfirmationDialogFormat } from "mappers/bookingMapper";
import { toRoomColors } from "mappers/RoomMapper";
import { ModalFormConsumer } from "providers";
import { withNotifications } from "hocs";
import { storageService } from "services";

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
    isOwner: false
  };

  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = openBookingEditModal => () => {
    this.handleMenuClose();
    const { booking } = this.props;
    openBookingEditModal(booking);
  };

  handleDelete = openDialog => () => {
    this.handleMenuClose();
    const { booking } = this.props;
    openDialog(booking);
  };

  componentDidMount() {
    const { id: userId } = this.props.booking.user;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      return this.setState({ isOwner: true });
    }
    return this.setState({ isOwner: false });
  }

  render() {
    const { anchorEl, isOwner } = this.state;
    const { classes: styleClasses, booking } = this.props;
    const {
      itemCard,
      bookingContainer,
      roomStickerGrid,
      bookingInfoGrid,
      bookingDateGrid
    } = styleClasses;

    const { userName, roomColor, roomNameAbbrev, dateText, room } = booking;
    const { bgColor, txtColor } = toRoomColors(room);
    const bookingForDialog = mapToConfirmationDialogFormat(booking);
    const { startTime, endTime } = bookingForDialog;

    return (
      <Card elevation={1} square className={itemCard}>
        <Grid container direction={"row"} className={bookingContainer}>
          <Grid item xs={3} className={roomStickerGrid}>
            <RoomSticker
              roomName={roomNameAbbrev}
              roomColor={roomColor}
              bgColor={bgColor}
              txtColor={txtColor}
            />
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
            <BookingOptionsButton
              onClick={this.handleMenuOpen}
              isOwner={isOwner}
            />
            <ModalFormConsumer>
              {({ handleDeleteMeeting, handleOnClickEditMeeting }) => (
                <BookingItemMenu
                  anchorEl={anchorEl}
                  onClose={this.handleMenuClose}
                  onBookingDelete={this.handleDelete(handleDeleteMeeting)}
                  onBookingEdit={this.handleEdit(handleOnClickEditMeeting)}
                />
              )}
            </ModalFormConsumer>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

const withContexts = compose(
  withStyles(styles),
  withNotifications
);
export const BookingItem = withContexts(BookingItemComponent);
