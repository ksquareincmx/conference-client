import React, { Fragment } from "react";
import { formatDate, formatTime } from "utils/BookingFormater";
import { withStyles, Button } from "@material-ui/core";
import { capitalize } from "lodash/fp";

const styles = () => {
  return {
    editBtn: {
      color: "white",
      width: 85,
      fontWeight: "bold",
      backgroundColor: "#5294e5",
      marginLeft: 10,
      opacity: 1
    },
    cancelBtn: {
      color: "white",
      width: 85,
      fontWeight: "bold",
      backgroundColor: "#696969",
      marginRight: 10,
      opacity: 1
    },
    actions: {
      margin: "5px 0px 5px 0px",
      display: "flex",
      justifyContent: "space-between"
    }
  };
};

const ContentComponent = props => {
  const {
    content,
    onClickEdit,
    onClickDelete,
    isOwner,
    classes: styleClasses
  } = props;
  const { start, end, title, roomName, desc } = content;
  const startTime = formatTime(formatDate(start));
  const endTime = formatTime(formatDate(end));
  const { cancelBtn, editBtn, actions } = styleClasses;
  return (
    <Fragment>
      <div>
        <h2>{capitalize(roomName)}</h2>
        <span>{title}</span>
        <br />
        <span>{`${desc} in conference 
              ${roomName} (from ${startTime} to ${endTime})
              `}</span>
        {isOwner ? (
          <div className={actions}>
            <Button
              variant="contained"
              onClick={onClickDelete}
              className={cancelBtn}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={onClickEdit}
              color="primary"
              className={editBtn}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div className={actions} />
        )}
      </div>
    </Fragment>
  );
};

export const ContentToolTip = withStyles(styles)(ContentComponent);
