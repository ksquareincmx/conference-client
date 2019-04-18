import React from "react";
import { withStyles } from "@material-ui/core";
import { EventToolTip } from "./EventToolTip/EventToolTip";
import { ModalFormConsumer } from "providers";

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
    isOpen: false
  };

  handleTooltipClose = () => {
    this.setState({ isOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { content, classes: styleClasses, onBookingsDataChange } = this.props;
    const { title } = content.event;
    const { eventContainter } = styleClasses;

    return (
      <ModalFormConsumer>
        {({ handleOnClickEditMeeting }) => (
          <EventToolTip
            content={content.event}
            handleTooltipClose={this.handleTooltipClose}
            handleTooltipOpen={this.handleTooltipOpen}
            onEdit={handleOnClickEditMeeting}
            open={this.state.isOpen}
            onBookingsDataChange={onBookingsDataChange}
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
