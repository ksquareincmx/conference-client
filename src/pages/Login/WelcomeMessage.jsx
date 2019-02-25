import React from "react";
import { withStyles } from "@material-ui/core/";

const style = theme => ({
  welcomeMessage: {
    fontSize: 40,
    marginTop: 60,
    color: "#747474",
    fontWeight: "bold",
    fontFamily: "helvetica"
  }
});

function WelcomeMessageComponent({ classes: styleClasses }) {
  const { welcomeMessage } = styleClasses;
  return (
    <div className={welcomeMessage}>
      Welcome,
      <br />
      Ksquarians!
    </div>
  );
}

export const WelcomeMessage = withStyles(style)(WelcomeMessageComponent);
