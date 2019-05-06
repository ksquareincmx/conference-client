import React, { Fragment } from "react";
import { ContentToolTip } from "./ContentToolTip";
import { withStyles, Tooltip, ClickAwayListener } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withNotifications } from "hocs";

const theme = (bgColor, txtColor) =>
  createMuiTheme({
    typography: {
      useNextVariants: true
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: bgColor,
          fontSize: "0.9em",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.8)",
          maxWidth: 200,
          color: txtColor
        }
      }
    }
  });

const styles = theme => {
  return {
    eventContainter: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
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

class EventToolTipComponent extends React.Component {
  handleEdit = () => {
    this.props.onEdit(this.props.content.booking);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.content.booking);
  };

  render() {
    const {
      content,
      handleTooltipClose,
      open: isOpen,
      isOwner,
      children,
      classes: styleClasses
    } = this.props;
    const {
      bootstrapPlacementLeft,
      bootstrapPlacementRight,
      bootstrapPlacementTop,
      bootstrapPlacementBottom
    } = styleClasses;
    const { bg_color: bgColor, txt_color: txtColor } = content.booking.room;
    const toolTipClasses = {
      tooltipPlacementLeft: bootstrapPlacementLeft,
      tooltipPlacementRight: bootstrapPlacementRight,
      tooltipPlacementTop: bootstrapPlacementTop,
      tooltipPlacementBottom: bootstrapPlacementBottom
    };

    return (
      <Fragment>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <MuiThemeProvider theme={theme(bgColor, txtColor)}>
            <Tooltip
              title={
                <Fragment>
                  <ContentToolTip
                    isOwner={isOwner}
                    content={content}
                    onClickEdit={this.handleEdit}
                    onClickDelete={this.handleDelete}
                  />
                </Fragment>
              }
              classes={{ ...toolTipClasses }}
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
          </MuiThemeProvider>
        </ClickAwayListener>
      </Fragment>
    );
  }
}

export const EventToolTip = withStyles(styles)(
  withNotifications(EventToolTipComponent)
);
