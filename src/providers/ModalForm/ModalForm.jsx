import React from "react";
import { Modal, withStyles } from "@material-ui/core";
import { BookingForm } from "components/Modals/CreateMeeting/BookingForm";
import { ConfirmationDialog } from "components/Modals/DeleteBooking/ConfirmationDialog";
import { storageService } from "services";

const styles = theme => ({
  modal: { width: "100%", height: "100%" }
});

const ModalFormContext = React.createContext({
  handleOnClickCreateMeeting: () => {},
  handleOnClickEditMeeting: () => {},
  handleOnCloseModal: () => {},
  handleDeleteMeeting: () => {},
  handleCloseDialog: () => {}
});

class ModalFormProviderComponent extends React.Component {
  state = {
    isModalOpen: false,
    isDialogOpen: false,
    isDelete: false,
    isDeleteLoading: false,
    shouldUpdate: false
  };

  handleClickCreateBooking = booking => {
    if (booking.start) {
      this.handleCreationFromCalendar(booking);
      return;
    }
    this.handleCreationFromButton();
    return;
  };

  handleCreationFromCalendar = booking => {
    const { roomName } = booking;
    this.setState({
      isModalOpen: true,
      isDelete: false,
      room: roomName,
      bookingClicked: false,
      quickAppointment: true,
      bookingClickedObj: booking
    });
    return;
  };

  handleCreationFromButton = () => {
    this.setState({
      isModalOpen: true,
      isDelete: false,
      room: null,
      bookingClicked: false,
      quickAppointment: false,
      roomId: null
    });
    return;
  };

  handleClickEditBooking = booking => {
    const { user, room } = booking;
    const { id: userId } = user;
    const { name: roomName, id: roomId } = room;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      this.setState({
        isModalOpen: true,
        bookingClicked: true,
        quickAppointment: false,
        bookingClickedObj: booking,
        roomName,
        roomId
      });
    }
  };

  handleDeleteBooking = booking => {
    this.setState(prev => ({
      shouldUpdate: !prev.shouldUpdate,
      isDelete: true,
      isDialogOpen: true,
      bookingFormated: booking
    }));
  };

  handleDeleteLoading = () => {
    this.setState({ isDeleteLoading: true });
  };

  handleAfterDelete = () => {
    this.setState({ isDeleteLoading: false });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false, isDelete: false });
  };

  render() {
    const {
      isModalOpen,
      isDialogOpen,
      isDeleteLoading,
      bookingClicked,
      bookingClickedObj,
      quickAppointment,
      roomName,
      roomId,
      bookingFormated
    } = this.state;

    const {
      classes: { modal },
      children,
      onBookingsDataChange
    } = this.props;

    return (
      <ModalFormContext.Provider
        value={{
          handleOnClickCreateMeeting: this.handleClickCreateBooking,
          handleOnClickEditMeeting: this.handleClickEditBooking,
          handleOnCloseModal: this.handleModalClose,
          handleDeleteMeeting: this.handleDeleteBooking,
          handleCloseDialog: this.handleDialogClose
        }}
      >
        {this.state.isDelete ? (
          <ConfirmationDialog
            bookingInfo={bookingFormated}
            isOpen={isDialogOpen}
            isLoading={isDeleteLoading}
            onCancel={this.handleDialogClose}
            onBookingsDataChange={onBookingsDataChange}
            update={this.state.shouldUpdate}
            onDeleteLoading={this.handleDeleteLoading}
            onAfterDelete={this.handleAfterDelete}
          />
        ) : (
          <Modal
            className={modal}
            open={isModalOpen}
            disableAutoFocus={true}
            disableEscapeKeyDown={false}
            onClose={this.handleModalClose}
          >
            <BookingForm
              roomName={roomName}
              roomId={roomId}
              isBookingEdition={bookingClicked}
              bookingForEdition={bookingClickedObj}
              quickAppointment={quickAppointment}
              onModalClose={this.handleModalClose}
              onBookingsDataChange={onBookingsDataChange}
            />
          </Modal>
        )}
        {children}
      </ModalFormContext.Provider>
    );
  }
}

const ModalFormConsumer = ModalFormContext.Consumer;
const ModalFormProvider = withStyles(styles)(ModalFormProviderComponent);
export { ModalFormProvider, ModalFormConsumer };
