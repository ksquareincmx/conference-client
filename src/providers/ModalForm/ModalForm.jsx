import React from "react";
import { Modal, withStyles } from "@material-ui/core";
import { BookingForm } from "components/Modals/CreateMeeting/BookingForm";

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
    isModalOpen: false
  };

  handleOnClickCreateMeeting = () => {
    this.setState({
      isModalOpen: true,
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
        isModalOpen: true,
        bookingClicked: true,
        bookingClickedObj: booking
      });
    }
  };

  handleOnCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      isModalOpen,
      bookingClicked,
      bookingClickedObj,
      room,
      roomId
    } = this.state;
    const { classes: styleClasses, children } = this.props;
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
          className={modal}
          open={isModalOpen}
          disableAutoFocus={true}
          onClose={this.handleOnCloseModal}
        >
          <BookingForm
            room={room}
            roomId={roomId}
            bookingClicked={bookingClicked}
            bookingClickedObj={bookingClickedObj}
            handleOnCloseModal={this.handleOnCloseModal}
          />
        </Modal>
        {children}
      </ModalFormContext.Provider>
    );
  }
}

export const ModalFormProvider = withStyles(styles)(ModalFormProviderComponent);
