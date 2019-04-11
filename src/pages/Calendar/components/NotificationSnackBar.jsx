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
  const { text, color } = sticker;
  return (
    <SnackBar variant={variant}>
      <SnackBarSticker color={color} text={text} />
      <SnackBarTextBox title={title} body={body} />
    </SnackBar>
  );
};
