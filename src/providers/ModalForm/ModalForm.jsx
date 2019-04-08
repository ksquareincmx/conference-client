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
      room: null,
      bookingClicked: false,
      quickAppointment: false,
      roomId: null
    });
    return;
  };

  handleClickEditBooking = booking => {
    const { userId, room } = booking;
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

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      isModalOpen,
      bookingClicked,
      bookingClickedObj,
      quickAppointment,
      roomName,
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
            roomName={roomName}
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
