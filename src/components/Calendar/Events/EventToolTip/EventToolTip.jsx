import React, { Fragment } from "react";
import { ContentToolTip } from "./ContentToolTip";
import { withStyles, Tooltip, ClickAwayListener } from "@material-ui/core";

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
    arrowRef: null
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node
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
    const { color } = content;
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
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          title={
            <Fragment>
              <ContentToolTip content={content} />
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
    );
  }
}

export const EventToolTip = withStyles(styles)(EventToolTipComponent);
