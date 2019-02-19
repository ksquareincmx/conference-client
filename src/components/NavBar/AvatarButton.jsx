import React from "react";
import { IconButton, Avatar } from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
  accountCircle: {
    fontSize: 50
  },
  avatar: {
    color: "#c4c6c6",
    backgroundColor: "#969696"
  }
};

function AvatarButton(props) {
  const { anchorEl, handleClick } = props;
  return (
    <IconButton
      aria-label="Menu"
      aria-owns={anchorEl ? "menu-appbar" : undefined}
      aria-haspopup="true"
      onClick={handleClick}
    >
      <Avatar style={styles.avatar}>
        <AccountCircle style={styles.accountCircle} />
      </Avatar>
    </IconButton>
  );
}

export default AvatarButton;
