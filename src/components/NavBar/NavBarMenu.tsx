import React from "react";
import { Menu, MenuItem } from "@material-ui/core/";
import { Link } from "react-router-dom";

// Might get better
export interface INavBarMenu {
  anchorEl: HTMLElement;
  onLogout: () => void;
  onClose: () => void;
}

export const NavBarMenu: React.SFC<INavBarMenu> = ({ anchorEl, onClose, onLogout }) => {
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
