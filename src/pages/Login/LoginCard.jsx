import React from "react";
import { Card, Grid, withStyles } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";
import { LoginButton } from "./LoginButton";
import { CardMessage } from "./CardMessage";
import { CardLogo } from "./CardLogo";

const style = theme => ({
  loginCard: {
    width: 375,
    height: 340,
    marginRight: 100,
    marginTop: 200,
    marginLeft: 100,
    marginBottom: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    borderRadius: 10,
    position: "absolute",
    top: 10,
    left: 715,
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
