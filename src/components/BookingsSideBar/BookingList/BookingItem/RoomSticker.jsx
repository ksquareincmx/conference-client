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

const getStickerColor = (bgColor, txtColor) => {
  const loadingColor = {
    background: "lightgray",
    color: "gray"
  };

  const realColor = {
    background: bgColor,
    color: txtColor,
    opacity: 0.6
  };

  return bgColor ? realColor : loadingColor;
};

const getRoomSticker = name => {
  return name ? capitalize(name) : "...";
};

const RoomStickerComponent = ({
  classes: { roomSticker },
  roomColor,
  roomName,
  txtColor,
  bgColor
}) => {
  return (
    <Paper
      elevation={0}
      className={roomSticker}
      style={getStickerColor(bgColor, txtColor)}
    >
      {getRoomSticker(roomName)}
    </Paper>
  );
};

export const RoomSticker = withStyles(styles)(RoomStickerComponent);
