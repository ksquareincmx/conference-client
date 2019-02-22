import React from "react";
import { Paper, withStyles } from "@material-ui/core";
import capitalize from "lodash/fp/capitalize";

const styles = theme => ({
  roomSticker: {
    height: 50,
    width: 50,
    margin: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "bold"
  }
});

const getStickerColor = color => {
  const loadingColor = {
    background: "lightgray",
    color: "gray"
  };

  const realColor = {
    background: "light" + color,
    color: "dark" + color,
    opacity: 0.6
  };

  return color ? realColor : loadingColor;
};

const getRoomSticker = name => {
  return name
    ? capitalize(`${name.substring(0, 1)}${name.substring(name.length - 1)}`)
    : "...";
};

const RoomStickerComponent = props => {
  const { classes, roomColor, roomName } = props;
  return (
    <Paper
      elevation={0}
      className={classes.roomSticker}
      style={getStickerColor(roomColor)}
    >
      {getRoomSticker(roomName)}
    </Paper>
  );
};

export const RoomSticker = withStyles(styles)(RoomStickerComponent);
