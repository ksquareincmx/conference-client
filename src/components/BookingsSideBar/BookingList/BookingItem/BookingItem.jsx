import React from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Card, withStyles, IconButton, Grid } from "@material-ui/core";
import { RoomSticker } from "./RoomSticker";
import { BookingDetails } from "./BookingDetails";
import { formatDate, formatTime } from "../../../../utils/BookingFormater";

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

const BookingItemComponent = ({ classes: styleClasses, booking }) => {
  const {
    itemCard,
    container,
    gridRoomSticker,
    gridInfo,
    gridDate,
    menuIcon
  } = styleClasses;
  const { roomColor, roomNameAbbrev, userName, start, end, dateText } = booking;
  const startTime = formatTime(formatDate(start));
  const endTime = formatTime(formatDate(end));

  return (
    <Card elevation={1} square className={itemCard}>
      <Grid container direction={"row"} className={container}>
        <Grid item xs={3} className={gridRoomSticker}>
          <RoomSticker roomColor={roomColor} roomName={roomNameAbbrev} />
        </Grid>
        <Grid item xs={6} className={gridInfo}>
          <BookingDetails
            userName={userName}
            startTime={startTime}
            endTime={endTime}
          />
        </Grid>
        <Grid item xs={3} className={gridDate}>
          <div> {dateText}</div>
          <div>
            <IconButton className={menuIcon}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export const BookingItem = withStyles(styles)(BookingItemComponent);
