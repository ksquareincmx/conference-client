import React from "react";
import { Modal, withStyles } from "@material-ui/core";
import { BookingForm } from "../../components/Modals/CreateMeeting/BookingForm";

const styles = theme => ({
  modal: { width: "100%", height: "100%" }
});

const ModalFormContext = React.createContext({
  handleOnClickCreateMeeting: () => {},
  handleOnClickEditMeeting: () => {},
  handleOnCloseModal: () => {}
});

export const ModalFormConsumer = ModalFormContext.Consumer;

class ModalFormProviderComponent extends React.Component {
  state = {
    openModal: false
  };

  handleOnClickCreateMeeting = () => {
    this.setState({
      openModal: true,
      room: null,
      bookingClicked: false,
      roomId: null
    });
  };

  handleOnClickEditMeeting = booking => {
    const { id: sessionUserId } = this.props.auth.user;
    const { user_id: bookingUserId } = booking;
    if (sessionUserId === bookingUserId) {
      this.setState({
        openModal: true,
        bookingClicked: true,
        bookingClickedObj: booking
      });
    }
  };

  handleOnCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const {
      openModal,
      bookingClicked,
      bookingClickedObj,
      room,
      roomId
    } = this.state;
    const {
      classes: styleClasses,
      bookingService,
      roomService,
      children
    } = this.props;
    const { modal } = styleClasses;

    return (
      <ModalFormContext.Provider
        value={{
          handleOnClickCreateMeeting: this.handleOnClickCreateMeeting,
          handleOnClickEditMeeting: this.handleOnClickEditMeeting,
          handleOnCloseModal: this.handleOnCloseModal
        }}
      >
        <Modal
          open={openModal}
          onClose={this.handleOnCloseModal}
          disableAutoFocus={true}
          className={modal}
        >
          <BookingForm
            handleOnCloseModal={this.handleOnCloseModal}
            booking={bookingService}
            bookingClicked={bookingClicked}
            bookingClickedObj={bookingClickedObj}
            roomService={roomService}
            room={room}
            roomId={roomId}
          />
        </Modal>
        {children}
      </ModalFormContext.Provider>
    );
  }
}

export const ModalFormProvider = withStyles(styles)(ModalFormProviderComponent);
