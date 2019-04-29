import React from "react";
import { getDateText, formatDate, formatTime } from "utils/BookingFormater";
import { mapToNotificationContentFormat } from "mappers/bookingMapper";
import { withNotifications } from "hocs";
import { storageService, bookingService } from "services";
import { DeleteDialogContent } from "./DeleteDialogContent";

class ConfirmationDialogComponent extends React.Component {
  handleConfirmation = () => {
    this.props.onDeleteLoading();
    this.handleDelete();
  };

  handleDelete = async () => {
    const {
      onSuccessNotification,
      onErrorNotification,
      onBookingsDataChange,
      onCancel: handleDialogClose,
      onAfterDelete
    } = this.props;
    try {
      const bookingInfo = await this.doDelete();
      handleDialogClose();
      onAfterDelete();
      if (bookingInfo) {
        onSuccessNotification({
          bookingInfo,
          notificationType: "delete"
        });
        return onBookingsDataChange();
      }
      return bookingInfo;
    } catch (error) {
      handleDialogClose();
      onAfterDelete();
      return onErrorNotification({
        title: "Action failed",
        body: "There was an error with the server"
      });
    }
  };

  doDelete = async () => {
    const { bookingInfo: booking, onErrorNotification } = this.props;
    const { id: userId } = booking.user;
    const { _d: endTime } = formatDate(booking.end);
    const { id: bookingId } = booking;
    const { id: sessionUserId } = storageService.getUserInfo();

    if (sessionUserId === userId) {
      if (new Date() > endTime) {
        return onErrorNotification({
          title: "Can't delete past bookings",
          body: "A booking can't be deleted once it starts"
        });
      }
      try {
        const deleteResponse = await bookingService.deleteOneById(bookingId);
        const { ok } = deleteResponse;
        if (ok) {
          return mapToNotificationContentFormat(booking);
        }

        return onErrorNotification({
          title: "Booking delete failed",
          body: "There was an error while trying to delete"
        });
      } catch (error) {
        return Promise.reject({
          title: "Appointment delete fail's",
          body: "There was an error with the server"
        });
      }
    }
    return onErrorNotification({
      title: "Action not allowed",
      body: "You don't have permissions to delete this booking"
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isLoading !== nextProps.isLoading) {
      return true;
    }
    return nextProps.update !== this.props.update;
  }

  render() {
    const { isLoading, isOpen, bookingInfo, onCancel } = this.props;

    return (
      <DeleteDialogContent
        isLoading={isLoading}
        isOpen={isOpen}
        bookingInfo={bookingInfo}
        onConfirmation={this.handleConfirmation}
        onCancel={onCancel}
      />
    );
  }
}

export const ConfirmationDialog = withNotifications(
  ConfirmationDialogComponent
);
