import React from "react";
import { withStyles } from "@material-ui/core/";

const style = theme => ({
  snackBarStickerContainer: {
    width: "4.0625rem",
    height: "4.0625rem",
    marginLeft: "0.625rem",
    marginTop: "0.625rem",
    position: "absolute",
    opacity: 0.6,
    borderRadius: "5px"
  },
  snackBarSticker: {
    height: "100%"
  }
});

const SnackBarStickerComponent = ({
  roomName,
  classes: { snackBarStickerContainer, snackBarSticker }
}) => {
  return (
    <div className={snackBarStickerContainer}>
      <img
        className={snackBarSticker}
        src={`/assets/${roomName}.png`}
        alt={`${roomName} room logo`}
      />
    </div>
  );
};

export const SnackBarSticker = withStyles(style)(SnackBarStickerComponent);
