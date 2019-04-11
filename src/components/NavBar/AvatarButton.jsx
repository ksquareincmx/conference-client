import React from "react";
import { IconButton, Avatar, withStyles } from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = theme => ({
  accountCircle: {
    fontSize: 50
  },
  avatar: {
    color: "#c4c6c6",
    backgroundColor: "#969696"
  }
});

const AvatarButtonComponent = ({
  anchorEl,
  onClick,
  classes: { accountCircle, avatar }
}) => {
  return (
    <IconButton
      aria-label="Menu"
      aria-owns={anchorEl ? "menu-appbar" : undefined}
      aria-haspopup="true"
      onClick={onClick}
    >
      <Avatar className={avatar}>
        <AccountCircle className={accountCircle} />
      </Avatar>
    </IconButton>
  );
};

export const AvatarButton = withStyles(styles)(AvatarButtonComponent);
