import React from "react";
import { withStyles } from "@material-ui/core/";
import Logo from "./Logo1.png";

const style = theme => ({
  companyLogo: {
    width: 65,
    height: 65,
    left: 150,
    top: -30,
    position: "absolute",
    fontWeight: "bold"
  }
});

function CompanyLogoComponent({ classes: styleClasses }) {
  const { companyLogo } = styleClasses;
  return <img className={companyLogo} src={Logo} alt="Ksquare-Inc!" />;
}

export const CompanyLogo = withStyles(style)(CompanyLogoComponent);
