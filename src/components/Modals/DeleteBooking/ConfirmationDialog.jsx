import React from "react";
import {
  withStyles,
  Button,
  DialogContent,
  DialogActions,
  Dialog,
  Divider,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  dialog: {
    padding: 40,
    paddingTop: 20
  },
  title: {
    color: "#5294e5",
    fontWeight: "bold",
    padding: 20,
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
  yesBtn: {
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
  }
});

class ConfirmationDialogComponent extends React.Component {
  handleOnClickCancel = () => {
    this.props.onClose();
  };

  handlehandleOnClickYes = () => {
    this.props.onClose();
    this.props.handleClickYes();
  };

  render() {
    const { booking, classes: styleClasses, onClose, open } = this.props;
    const { roomName, startTime, endTime, dateText } = booking;
    const {
      dialog,
      title,
      content,
      divider,
      remarkedTxt,
      btnsContainer,
      yesBtn,
      cancelBtn
    } = styleClasses;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        onClose={onClose}
        open={open}
      >
        <div className={dialog}>
          <Typography variant="h4" className={title}>
            Delete Meeting
          </Typography>
          <Divider className={divider} />
          <DialogContent className={content}>
            <p>
              Are you sure you want to delete the meeting in{" "}
              <span className={remarkedTxt}>{roomName}</span> from{" "}
              <span className={remarkedTxt}>{startTime}</span> to{" "}
              <span className={remarkedTxt}>{endTime}</span> for{" "}
              <span className={remarkedTxt}>{dateText}</span>?
            </p>
          </DialogContent>
          <DialogActions className={btnsContainer}>
            <Button
              variant="contained"
              onClick={this.handleOnClickCancel}
              className={cancelBtn}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handlehandleOnClickYes}
              color="primary"
              className={yesBtn}
            >
              Yes
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

export const ConfirmationDialog = withStyles(styles)(
  ConfirmationDialogComponent
);
