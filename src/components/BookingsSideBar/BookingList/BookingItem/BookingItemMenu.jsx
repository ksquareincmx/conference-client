import React, { Fragment } from "react";
import { Menu, MenuItem, withStyles, Divider } from "@material-ui/core";

const styles = theme => ({
  menuItem: {
    color: "#6A6A6A",
    fontWeight: "bold",
    fontSize: 15
  }
});

const BookingItemMenuComponent = ({
  classes: { menuItem },
  anchorEl,
  onClose,
  onBookingDelete,
  onBookingEdit
}) => {
  const isOpen = Boolean(anchorEl);
  return (
    <Fragment>
      <Menu id="long-menu" anchorEl={anchorEl} open={isOpen} onClose={onClose}>
        <MenuItem className={menuItem} onClick={onBookingEdit}>
          Edit Meeting
        </MenuItem>
        )}
        <Divider />
        <MenuItem className={menuItem} onClick={onBookingDelete}>
          Delete Meeting
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export const BookingItemMenu = withStyles(styles)(BookingItemMenuComponent);
