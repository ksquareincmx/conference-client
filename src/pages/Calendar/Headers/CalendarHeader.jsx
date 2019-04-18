import React from "react";
import { IconButton, withStyles } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  headerContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 45
  },
  title: {
    height: 80,
    fontSize: "2.2em",
    fontWeight: "bold",
    color: "#3049a1"
  },
  icon: {
    width: 50,
    height: 50,
    color: "#5294e5"
  },
  iconButton: {
    height: 70,
    width: 50,
    borderRadius: 10,
    paddingTop: 0,
    paddingBottom: 0
  },
  subtitle: {
    color: "#7f7f7f",
    fontSize: 25
  }
});

const CalendarHeaderComponent = props => {
  const { onClickNext, onClickPrev, classes: styleClasses } = props;
  const { headerContainer, title, icon, iconButton, subtitle } = styleClasses;

  return (
    <div className={headerContainer}>
      <div className={title}>
        <IconButton className={iconButton} onClick={onClickPrev}>
          <KeyboardArrowLeft className={icon} />
        </IconButton>
        <span>{props.titleTxt}</span>
        <IconButton className={iconButton} onClick={onClickNext}>
          <KeyboardArrowRight className={icon} />
        </IconButton>
      </div>
      <div className={subtitle}>
        <span>{props.subtitleTxt}</span>
      </div>
    </div>
  );
};

export const CalendarHeader = withStyles(styles)(CalendarHeaderComponent);
