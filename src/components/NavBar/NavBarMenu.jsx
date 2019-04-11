import React from "react";
import { Menu, MenuItem } from "@material-ui/core/";
import { Link } from "react-router-dom";

export const NavBarMenu = ({ anchorEl, onClose, onLogout }) => {
  const isOpen = Boolean(anchorEl);
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isOpen}
      onClose={onClose}
    >
      <MenuItem onClick={onLogout} component={Link} to="/login">
        Log Out
      </MenuItem>
    </Menu>
  );
};
