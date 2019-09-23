import React from "react";
import { withStyles } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  card: {
    background: "#cf6066",
    width: "375px",
    height: "95px",
    boxSizing: "border-box",
    margin: "10px auto 0px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white"
  },
  cardMessage: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center"
  },
  cardMessageIcon: {
    width: "30%",
    height: "100%",
    margin: "0px 0px 0px 30px"
  },
  cardMessageText: {
    width: "70%",
    height: "100%",
    textAlign: "center",
    fontSize: "1rem",
    margin: "0 auto",
    boxSizing: "border-box",
    paddingTop: "2rem"
  },
  cardBtn: {
    display: "flex",
    justifyContent: "flex-end",
    width: "10%",
    height: "30px",
    color: "white",
    background: "transparent",
    border: "none",
    boxSizing: "border-box",
    paddingBottom: "10px",
    paddingTop: "5px"
  }
});

const LoginErrorCardComponent = ({ isOpen, onClose, classes }) => {
  const {
    card,
    cardMessage,
    cardMessageIcon,
    cardMessageText,
    cardBtn
  } = classes;
  return (
    <div className={card} style={{ opacity: isOpen ? 1 : 0 }}>
      <div className={cardMessage}>
        <FontAwesomeIcon
          className={cardMessageIcon}
          icon={faExclamationTriangle}
          size="2x"
          transform="left-1"
        />
        <h1 className={cardMessageText}>
          Sorry! An error has ocurred with google login. Try again.
        </h1>
      </div>
      <button className={cardBtn} onClick={onClose}>
        <FontAwesomeIcon
          className={cardBtn}
          icon={faTimes}
          size="2x"
          transform="left-1"
        />
      </button>
    </div>
  );
};

export const LoginErrorCard = withStyles(styles)(LoginErrorCardComponent);
