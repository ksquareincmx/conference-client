import React from "react";
import { withStyles } from "@material-ui/core/";
import classNames from "classnames";

const style = theme => ({
  snackBarSticker: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6
  },
  snackBarStickerContent: {
    fontSize: 35,
    fontWeight: "bold"
  }
});

const SnackBarStickerComponent = ({
  color,
  text,
  classes: { snackBarSticker, snackBarStickerContent },
  overrideClass
}) => {
  return (
    <div
      className={classNames(snackBarSticker, overrideClass)}
      style={{ background: `light${color}` }}
    >
      <div className={snackBarStickerContent} style={{ color: `dark${color}` }}>
        {text}
      </div>
    </div>
  );
};

export const SnackBarSticker = withStyles(style)(SnackBarStickerComponent);
