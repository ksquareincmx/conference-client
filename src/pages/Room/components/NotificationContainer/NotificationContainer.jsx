import React from "react";
import { withStyles } from "@material-ui/core/";
import { TransitionGroup } from "react-transition-group";

const styles = theme => ({
  container: {
    top: 0,
    right: 0,
    zIndex: 1250,
    overflowX: "hidden",
    overflowY: "auto",
    maxHeight: "100%",
    boxSizing: "border-box",
    padding: "10px",
    pointerEvents: "auto",
    position: "absolute"
  }
});

const NotifcationContainerComponent = ({
  children,
  classes: { container }
}) => {
  return (
    <div className={container}>
      <TransitionGroup component={null}>{children}</TransitionGroup>
    </div>
  );
};

export const NotifcationContainer = withStyles(styles)(
  NotifcationContainerComponent
);
