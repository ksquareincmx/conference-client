import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/Inbox";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import "./BookingItem.css";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const getDate = date => {
  return (
    addZero(date.getDate()) +
    "/" +
    addZero(date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};

function BookingItem(props) {
  const startNotFormmat = props.booking.start.substring(
    0,
    props.booking.start.length - 1
  );
  const startDate = new Date(startNotFormmat);

  const endNotFormat = props.booking.end.substring(
    0,
    props.booking.end.length - 1
  );
  const endDate = new Date(endNotFormat);

  const startTime =
    addZero(startDate.getHours()) + ":" + addZero(startDate.getMinutes());
  const endTime =
    addZero(endDate.getHours()) + ":" + addZero(endDate.getMinutes());

  return (
    <ListItem button onClick={props.clicked(props.booking)}>
      <Grid container direction="row" className="booking-item-row-container">
        <Grid item xs={3} container direction="column" justify="center">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <div className="booking-item-roomname"> {props.booking.roomName}</div>
        </Grid>
        <Grid item xs={7} container direction="column">
          <div className="booking-item-username">
            {" "}
            {props.booking.userName}{" "}
          </div>
          <div className="booking-item-time">
            {" "}
            {startTime + " to " + endTime}{" "}
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="booking-item-date">{getDate(startDate)}</div>
        </Grid>
      </Grid>
      <Divider />
    </ListItem>
  );
}

export default BookingItem;
