import React, { Fragment } from "react";
import { ContentToolTip } from "./ContentToolTip";
import { ConfirmationDialog } from "components/Modals/DeleteBooking/ConfirmationDialog";
import { withStyles, Tooltip, ClickAwayListener } from "@material-ui/core";
import {
  getDateText,
  formatDate,
  formatTime,
  abbreviateName
} from "utils/BookingFormater";
import { storageService, bookingService } from "services";
import { withNotifications } from "hocs";
import { capitalize } from "lodash/fp";

const arrowGenerator = color => {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: "-0.95em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.95em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
};

const styles = theme => {
  return {
    eventContainter: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    arrowPopper: arrowGenerator("white"),
    arrow: {
      position: "absolute",
      fontSize: 6,
      width: "3em",
      height: "3em",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid"
      }
    },
    popperGreen: arrowGenerator("#afe270"),
    tooltipGreen: {
      backgroundColor: "#afe270",
      fontSize: "0.9em",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.8)",
      maxWidth: 200,
      color: "#053000"
    },
    popperBlue: arrowGenerator("#a1ded0"),
    tooltipBlue: {
      backgroundColor: "#a1ded0",
      fontSize: "0.9em",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.8)",
      maxWidth: 200,
      color: "#00543f"
    },
    bootstrapPlacementLeft: {
      margin: "0 8px"
    },
    bootstrapPlacementRight: {
      margin: "0 8px"
    },
    bootstrapPlacementTop: {
      margin: "8px 0"
    },
    bootstrapPlacementBottom: {
      margin: "8px 0"
    }
  };
};

const getTooltipColor = (color, styles) => {
  switch (color) {
    case "blue":
      return {
        tooltip: styles.tooltipBlue,
        popper: styles.popperBlue
      };
    case "green":
      return {
        tooltip: styles.tooltipGreen,
        popper: styles.popperGreen
      };
    default:
      return {
        tooltip: styles.tooltipGreen,
        popper: styles.popperGreen
      };
  }
};

class EventToolTipComponent extends React.Component {
  state = {
    arrowRef: null,
    openDialog: false
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  handleOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  shootNotification = content => {
    // TODO: This functionality must be in a provider
    const { notify } = this.props;
    const configOptions = {
      autoDismissTimeout: 5000,
      autoDismiss: true
    };
    notify(content, configOptions);
  };

  handleDelete = async () => {
    const {
      start,
      end,
      title,
      userId,
      roomId,
      roomName,
      color,
      bookingId,
      desc
    } = this.props.content;
    const { id: sessionUserId } = storageService.getUserInfo();
    if (sessionUserId === userId) {
      try {
        const res = await bookingService.deleteOneById(bookingId);
        if (res.ok) {
          return this.shootNotification({
            message: {
              reason: "Appointment successfully deleted",
              details: `${title} deleted an appointment in ${roomName}`
            },
            sticker: {
              color: color,
              text: abbreviateName(capitalize(roomName))
            },
            variant: "success"
          });
        }
        return this.shootNotification({
          message: {
            reason: "The appointment failed to be deleted",
            details: `${title} tried to delete an appointment in ${roomName}`
          },
          sticker: {
            color: "grey",
            text: "X"
          },
          variant: "error"
        });
      } catch (error) {
        return this.shootNotification({
          message: {
            reason: "The appointment failed to be deleted",
            details: `Something went wrong with the server`
          },
          sticker: {
            color: "grey",
            text: "X"
          },
          variant: "error"
        });
      }
    }
    return this.shootNotification({
      message: {
        reason: "Not allowed",
        details: `You ar not allowed to delete this appointment`
      },
      sticker: {
        color: "grey",
        text: "X"
      },
      variant: "error"
    });
  };

  render() {
    const { arrowRef } = this.state;
    const {
      content,
      handleTooltipClose,
      open: isOpen,
      children,
      classes: styleClasses
    } = this.props;
    const {
      arrow,
      bootstrapPlacementLeft,
      bootstrapPlacementRight,
      bootstrapPlacementTop,
      bootstrapPlacementBottom
    } = styleClasses;
    const { start, end, roomName, color } = content;
    const bookingFormated = {
      roomName,
      dateText: getDateText(formatDate(start)),
      startTime: formatTime(formatDate(start)),
      endTime: formatTime(formatDate(end))
    };
    const tooltipStyleColors = getTooltipColor(color, styleClasses);
    const toolTipClasses = {
      ...tooltipStyleColors,
      tooltipPlacementLeft: bootstrapPlacementLeft,
      tooltipPlacementRight: bootstrapPlacementRight,
      tooltipPlacementTop: bootstrapPlacementTop,
      tooltipPlacementBottom: bootstrapPlacementBottom
    };
    const popperProps = {
      popperOptions: {
        modifiers: {
          arrow: {
            enabled: Boolean(arrowRef),
            element: arrowRef
          }
        }
      }
    };

    return (
      <Fragment>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            title={
              <Fragment>
                <ContentToolTip
                  content={content}
                  onClickDelete={this.handleOpenDialog}
                />
                <span className={arrow} ref={this.handleArrowRef} />
              </Fragment>
            }
            classes={{ ...toolTipClasses }}
            PopperProps={popperProps}
            placement={"right"}
            interactive
            onClose={handleTooltipClose}
            open={isOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            {children}
          </Tooltip>
        </ClickAwayListener>
        <ConfirmationDialog
          handleClickYes={this.handleDelete}
          booking={bookingFormated}
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        />
      </Fragment>
    );
  }
}

export const EventToolTip = withStyles(styles)(
  withNotifications(EventToolTipComponent)
);
