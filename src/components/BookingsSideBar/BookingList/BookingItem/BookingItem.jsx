import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Card, withStyles, IconButton, Grid } from "@material-ui/core";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import moment from "moment";

const styles = theme => ({
  itemCard: {
    width: "100%",
    height: 120,
    marginBottom: 2,
    overflow: "unset"
  },
  container: {
    height: 120
  },
  gridRoomSticker: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15
  },
  gridInfo: {
    display: "flex",
    alignItems: "center"
  },
  gridDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
    color: "#A7A7A7",
    fontSize: 15
  },
  menuIcon: {
    height: 50,
    width: 20,
    borderRadius: 5
  }
});

const normaliceTZ = date => date.substring(0, date.length - 1);

function BookingItemComponent(props) {
  const { classes } = props;
  const { roomColor, roomName, userName, start, end } = props.booking;
  const startDate = moment(normaliceTZ(start));
  const startTime = startDate.format("LT");
  const endTime = moment(normaliceTZ(end)).format("LT");

  const getDateText = date => {
    if (date) {
      const today = moment();
      const tomorrow = moment().add(1, "days");
      const isCurrentMonth =
        date.year() === today.year() && date.month() === today.month();

      return isCurrentMonth
        ? date.date() === today.date()
          ? "Today"
          : date.date() === tomorrow.date()
          ? "Tomorrow"
          : date.format("L")
        : date.format("L");
    }
    return "";
  };

  return (
    <Card elevation={1} square className={classes.itemCard}>
      <Grid container direction={"row"} className={classes.container}>
        <Grid item xs={3} className={classes.gridRoomSticker}>
          <RoomSticker roomColor={roomColor} roomName={roomName} />
        </Grid>
        <Grid item xs={6} className={classes.gridInfo}>
          <BookingDetails
            userName={userName}
            startTime={startTime}
            endTime={endTime}
          />
        </Grid>
        <Grid item xs={3} className={classes.gridDate}>
          <div> {getDateText(startDate)}</div>
          <div>
            <IconButton className={classes.menuIcon}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

export const BookingItem = withStyles(styles)(BookingItemComponent);
