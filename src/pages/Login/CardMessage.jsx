import React from "react";
import { withStyles } from "@material-ui/core/";

const style = theme => ({
  cardMessage: {
    marginTop: 60,
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "helvetica",
    color: "#747474"
  }
});

const CardMessageComponent = ({ classes: { cardMessage } }) => (
  <div className={cardMessage}>
    Welcome,
    <br />
    Ksquarians!
  </div>
);

export const CardMessage = withStyles(style)(CardMessageComponent);
