import React from "react";
import { withStyles } from "@material-ui/core";
import { EventToolTip } from "./EventToolTip/EventToolTip";

const styles = theme => {
  return {
    eventContainter: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
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
    const { content, classes: styleClasses } = this.props;
    const { title } = content.event;
    const { eventContainter } = styleClasses;

    return (
      <EventToolTip
        content={content.event}
        handleTooltipClose={this.handleTooltipClose}
        handleTooltipOpen={this.handleTooltipOpen}
        open={this.state.isOpen}
      >
        <div className={eventContainter} onClick={this.handleTooltipOpen}>
          <strong>{title}</strong>
        </div>
      </EventToolTip>
    );
  }
}

export const Event = withStyles(styles)(EventComponent);
