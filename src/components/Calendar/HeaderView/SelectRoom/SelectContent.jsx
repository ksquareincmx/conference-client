import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  arrow: {
    marginLeft: "5px",
    marginRight: "5px",
    position: "absolute",
    right: 0
  },
  roomImg: {
    height: "2.4rem",
    borderRadius: "5px",
    marginRight: "10px"
  }
});

const SelectContentComponent = props => {
  const { roomName, classes: styleClasses } = props;
  const { roomImg, arrow } = styleClasses;
  return (
    <Fragment>
      {roomName ? (
        <Fragment>
          <img
            className={roomImg}
            src={`/assets/${roomName}.png`}
            alt={`${roomName} logo icon`}
          />
          <span>{roomName}</span>
          <div className={arrow}>▼</div>
        </Fragment>
      ) : (
        "Loading..."
      )}
    </Fragment>
  );
};

export const SelectContent = withStyles(styles)(SelectContentComponent);
