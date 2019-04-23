import React from "react";
import {
  withStyles,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  Divider,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { getDateText, formatDate, formatTime } from "utils/BookingFormater";

const styles = theme => ({
  dialog: {
    padding: 30,
    paddingTop: 20,
    paddingBottom: 10
  },
  title: {
    color: "#5294e5",
    fontWeight: "bold",
    padding: 15,
    paddingLeft: 0,
    paddingTop: 0
  },
  content: {
    color: "#696969",
    paddingLeft: 0
  },
  divider: {
    borderTop: "1px solid gray"
  },
  remarkedTxt: {
    fontWeight: "bold"
  },
  confirmationBtn: {
    color: "white",
    width: 84,
    fontWeight: "bold",
    backgroundColor: "#5294e5",
    marginLeft: 20
  },
  cancelBtn: {
    color: "white",
    width: 84,
    fontWeight: "bold",
    backgroundColor: "#696969",
    marginRight: 20
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "center"
  },
  saveBtnWrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  btnProgress: {
    color: "blue",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -4
  }
});

const DeleteDialogContentComponent = props => {
  const {
    isLoading,
    isOpen,
    bookingInfo,
    onConfirmation,
    onCancel,
    classes: styleClasses
  } = props;
  const room = bookingInfo.room ? bookingInfo.room.name : "";
  const dateText = bookingInfo.start
    ? getDateText(formatDate(bookingInfo.start))
    : "";
  const startTime = bookingInfo.start
    ? formatTime(formatDate(bookingInfo.start))
    : "";
  const endTime = bookingInfo.end
    ? formatTime(formatDate(bookingInfo.end))
    : "";
  const {
    dialog,
    title,
    content,
    divider,
    remarkedTxt,
    btnsContainer,
    confirmationBtn,
    cancelBtn,
    saveBtnWrapper,
    btnProgress
  } = styleClasses;

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      onClose={onCancel}
      open={isOpen}
    >
      <div className={dialog}>
        <Typography variant="h5" className={title}>
          Delete Meeting
        </Typography>
        <Divider className={divider} />
        <DialogContent className={content}>
          <p>
            Are you sure you want to delete the meeting in{" "}
            <span className={remarkedTxt}>{room}</span> from{" "}
            <span className={remarkedTxt}>{startTime}</span> to{" "}
            <span className={remarkedTxt}>{endTime}</span> for{" "}
            <span className={remarkedTxt}>{dateText}</span>?
          </p>
        </DialogContent>
        <DialogActions className={btnsContainer}>
          <Button className={cancelBtn} variant="contained" onClick={onCancel}>
            Cancel
          </Button>
          <div className={saveBtnWrapper}>
            <Button
              className={confirmationBtn}
              variant="contained"
              color="primary"
              onClick={onConfirmation}
              disabled={isLoading}
            >
              Yes
            </Button>
            {isLoading && (
              <CircularProgress size={24} className={btnProgress} />
            )}
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export const DeleteDialogContent = withStyles(styles)(
  DeleteDialogContentComponent
);
