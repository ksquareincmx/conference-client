import React from "react";
import { Menu, MenuItem, Divider } from "@material-ui/core/";
import { Link } from "react-router-dom";

// const

// class NavMenu extends React.Component {
//   state = {};
// }

export function NavBarMenu({ anchorEl, onClose, onLogout }) {
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
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>Profile</MenuItem>

      <MenuItem onClick={onClose} component={Link} to="/dashboard">
        Dashboard
      </MenuItem>

      <Divider />

      <MenuItem onClick={onLogout} component={Link} to="/login">
        Log Out
      </MenuItem>
    </Menu>
  );
}
