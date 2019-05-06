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
  const { text, bgColor, txtColor } = sticker;
  return (
    <SnackBar variant={variant}>
      <SnackBarSticker text={text} bgColor={bgColor} txtColor={txtColor} />
      <SnackBarTextBox title={title} body={body} />
    </SnackBar>
  );
};
