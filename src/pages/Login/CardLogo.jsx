import React from "react";
import { withStyles } from "@material-ui/core/";
import Logo from "./Logo1.png";

const style = theme => ({
  cardLogo: {
    width: 65,
    height: 65,
    left: 150,
    top: -30,
    position: "absolute",
    fontWeight: "bold"
  }
});

const cardLogoComponent = ({ classes: { cardLogo } }) => (
  <img className={cardLogo} src={Logo} alt="Ksquare-Inc!" />
);

export const CardLogo = withStyles(style)(cardLogoComponent);
