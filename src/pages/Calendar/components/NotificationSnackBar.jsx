import React from "react";
import {
  SnackBar,
  SnackBarSticker,
  SnackBarTextBox
} from "components/SnackBar";

export const NotificationSnackBar = ({
  children: { message, sticker, variant }
}) => {
  const { title, body } = message;
  const { roomName } = sticker;
  return (
    <SnackBar variant={variant}>
      <SnackBarSticker roomName={roomName} />
      <SnackBarTextBox title={title} body={body} />
    </SnackBar>
  );
};
