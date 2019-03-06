import React, { Fragment } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Menu,
  MenuItem,
  withStyles,
  IconButton,
  Divider
} from "@material-ui/core";

const styles = theme => ({
  menuIcon: {
    height: 50,
    width: 20,
    borderRadius: 5
  },
  menuItem: {
    color: "#6A6A6A",
    fontWeight: "bold",
    fontSize: 15
  }
});

class BookingItemMenuComponent extends React.Component {
  state = {
    anchorEl: null
  };

  handleOnClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOnClose = () => {
    this.setState({ anchorEl: null });
  };

  handleOnClickDelete = () => {
    this.handleOnClose();
    this.props.handleOnDelete();
  };

  handleOnClickEdit = () => {
    this.handleOnClose();
    this.props.handleOnEdit();
  };

  render() {
    const {
      classes: { menuIcon, menuItem }
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton className={menuIcon} onClick={this.handleOnClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleOnClose}
        >
          <MenuItem onClick={this.handleOnClose} className={menuItem}>
            View Meeting
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleOnClickEdit} className={menuItem}>
            Edit Meeting
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleOnClickDelete} className={menuItem}>
            Delete Meeting
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export const BookingItemMenu = withStyles(styles)(BookingItemMenuComponent);
