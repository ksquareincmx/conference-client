import React from "react";
import { Modal, withStyles } from "@material-ui/core";
import { BookingForm } from "components/Modals/CreateMeeting/BookingForm";
import { storageService } from "services";

const styles = theme => ({
  modal: { width: "100%", height: "100%" }
});

const ModalFormContext = React.createContext({
  handleOnClickCreateMeeting: () => {},
  handleOnClickEditMeeting: () => {},
  handleOnCloseModal: () => {}
});

class ModalFormProviderComponent extends React.Component {
  state = {
    isModalOpen: false
  };

  handleClickCreateBooking = booking => {
    // This comes from the calendar grid
    if (booking.start) {
      return this.setState({
        isModalOpen: true,
        room: booking.roomName,
        bookingClicked: false,
        quickAppointment: true,
        bookingClickedObj: booking
      });
    }
    // This comes from the button
    return this.setState({
      isModalOpen: true,
      room: null,
      bookingClicked: false,
      quickAppointment: false,
      roomId: null
    });
  };

  handleClickEditBooking = booking => {
    const { userId } = booking;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      this.setState({
        isModalOpen: true,
        bookingClicked: true,
        quickAppointment: false,
        bookingClickedObj: booking,
        room: booking.room.name,
        roomId: booking.room.id
      });
    }
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      isModalOpen,
      bookingClicked,
      bookingClickedObj,
      quickAppointment,
      room,
      roomId
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
          handleOnCloseModal: this.handleModalClose
        }}
      >
        <Modal
          className={modal}
          open={isModalOpen}
          disableAutoFocus={true}
          onClose={this.handleModalClose}
        >
          <BookingForm
            room={room}
            roomId={roomId}
            isBookingEdition={bookingClicked}
            bookingForEdition={bookingClickedObj}
            quickAppointment={quickAppointment}
            onModalClose={this.handleModalClose}
            onBookingsDataChange={onBookingsDataChange}
          />
        </Modal>
        {children}
      </ModalFormContext.Provider>
    );
  }
}

const ModalFormConsumer = ModalFormContext.Consumer;
const ModalFormProvider = withStyles(styles)(ModalFormProviderComponent);
export { ModalFormProvider, ModalFormConsumer };
