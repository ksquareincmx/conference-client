import React from "react";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  roomStickerContainer: {
    height: "3.125rem",
    width: "3.125rem",
    margin: "1.25rem"
  },
  roomSticker: {
    height: "100%"
  }
});

const RoomStickerComponent = ({ roomName, classes }) => {
  const { roomStickerContainer, roomSticker } = classes;
  return (
    <div className={roomStickerContainer}>
      <img
        className={roomSticker}
        src={`/assets/${roomName}.png`}
        alt={`${roomName} logo icon`}
      />
    </div>
  );
};

export const RoomSticker = withStyles(styles)(RoomStickerComponent);
