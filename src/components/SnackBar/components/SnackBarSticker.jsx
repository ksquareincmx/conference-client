import React from "react";
import { withStyles } from "@material-ui/core/";
import classNames from "classnames";

const style = theme => ({
  snackBarSticker: {
    width: 65,
    height: 65,
    marginLeft: 10,
    marginTop: 10,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6,
    borderRadius: 5
  },
  snackBarStickerContent: {
    fontSize: 40,
    fontWeight: "bold"
  }
});

const SnackBarStickerComponent = ({
  bgColor,
  txtColor,
  text,
  classes: { snackBarSticker, snackBarStickerContent }
}) => {
  return (
    <div
      className={snackBarSticker}
      style={{ background: bgColor ? bgColor : "gray" }}
    >
      <div className={snackBarStickerContent} style={{ color: txtColor }}>
        {text}
      </div>
    </div>
  );
};

export const SnackBarSticker = withStyles(style)(SnackBarStickerComponent);
