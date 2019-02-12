import React from "react";
import { Menu, MenuItem } from "@material-ui/core/";
import { Link } from "react-router-dom";


function NavBarMenu (props) {
    const { 
      anchorEl,
      handleClose,
      handleLogout
    } = props;
    
    return (
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          onClick={handleClose}
        >
          Profile
        </MenuItem>
        
        <MenuItem 
          onClick={handleClose} 
          component={Link}
          to="/dashboard"
        >
          Dashboard
        </MenuItem>
        
        <hr />
        
        <MenuItem
          onClick={handleLogout}
          component={Link}
          to="/login"
        >
          Log Out
        </MenuItem>
      </Menu>
    );
}

export default NavBarMenu