import React from "react";
import { Card, withStyles } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import { LoginButton } from "./LoginButton";
import { CardMessage } from "./CardMessage";
import { CardLogo } from "./CardLogo";

const style = theme => ({
  loginCard: {
    width: 375,
    height: 340,
    margin: "0 auto",
    display: "block",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    borderRadius: 10,
    position: "relative",
    overflow: "visible"
  }
});

const LoginCardComponent = ({ classes: { loginCard }, onLogin }) => (
  <Card className={loginCard}>
    <CardContent>
      <CardLogo />
      <CardMessage />
      <LoginButton onClick={onLogin} />
    </CardContent>
  </Card>
);

export const LoginCard = withStyles(style)(LoginCardComponent);
