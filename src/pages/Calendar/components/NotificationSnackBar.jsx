import React from "react";
import { withStyles } from "@material-ui/core/";

import {
  SnackBar,
  SnackBarSticker,
  SnackBarTextBox
} from "components/SnackBar";

const styles = theme => ({
  notificationSnackBar: {
    width: 440,
    height: 80,
    boxShadow: "0px 4px 4px #888888",
    marginBottom: 10
  },
  notificationSnackBarSticker: {
    width: 65,
    height: 65,
    marginLeft: 10,
    marginTop: 7
  },
  notificationSnackBarTextBox: {
    top: 5,
    left: 100,
    width: 300,
    height: 65
  }
});

const NotificationSnackBarComponent = ({
  children: { message, sticker, variant },
  classes: {
    notificationSnackBar,
    notificationSnackBarTextBox,
    notificationSnackBarSticker
  }
}) => {
  const { reason, details } = message;
  const { text, color } = sticker;
  return (
    <SnackBar overrideClass={notificationSnackBar} variant={variant}>
      <SnackBarSticker
        overrideClass={notificationSnackBarSticker}
        color={color}
        text={text}
      />
      <SnackBarTextBox
        overrideClass={notificationSnackBarTextBox}
        reason={reason}
        details={details}
      />
    </SnackBar>
  );
};

const NotificationSnackBar = withStyles(styles)(NotificationSnackBarComponent);
export { NotificationSnackBar };
