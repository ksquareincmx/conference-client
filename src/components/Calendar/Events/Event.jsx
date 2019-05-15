import React from "react";
import { withStyles } from "@material-ui/core";
import { EventToolTip } from "./EventToolTip/EventToolTip";
import { ModalFormConsumer } from "providers";
import { storageService } from "services";

const styles = theme => {
  return {
    eventContainter: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.9em"
    }
  };
};

class EventComponent extends React.Component {
  state = {
    isOpen: false,
    isOwner: false
  };

  handleTooltipClose = () => {
    this.setState({ isOpen: false });
  };

  handleTooltipOpen = () => {
    const { id: userId } = this.props.content.event.booking.user;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      return this.setState({ isOwner: true, isOpen: true });
    }
    return this.setState({ isOwner: false, isOpen: true });
  };

  render() {
    const { isOpen, isOwner } = this.state;
    const {
      content,
      classes: styleClasses,
      onBookingsDataChange,
      isSingleGrid
    } = this.props;
    const { title } = content.event;
    const { eventContainter } = styleClasses;

    return (
      <ModalFormConsumer>
        {({ handleOnClickEditMeeting, handleDeleteMeeting }) => (
          <EventToolTip
            content={content.event}
            handleTooltipClose={this.handleTooltipClose}
            handleTooltipOpen={this.handleTooltipOpen}
            onEdit={handleOnClickEditMeeting}
            onDelete={handleDeleteMeeting}
            open={isOpen}
            isOwner={isOwner}
            onBookingsDataChange={onBookingsDataChange}
            isSingleGrid={isSingleGrid}
          >
            <div className={eventContainter} onClick={this.handleTooltipOpen}>
              <strong>{title}</strong>
            </div>
          </EventToolTip>
        )}
      </ModalFormConsumer>
    );
  }
}

export const Event = withStyles(styles)(EventComponent);
