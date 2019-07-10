import React from "react";
import { Card } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";

import { LoginButton } from "./LoginButton";
import { CardMessage } from "./CardMessage";
import { CardLogo } from "./CardLogo";
import { useStyles } from "hooks/useStyles";

const style = {
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
};

export const LoginCard = ({ onLogin, onLoginError }) => {
  const { loginCard } = useStyles(style);
  return (
    <Card className={loginCard}>
      <CardContent>
        <CardLogo />
        <CardMessage />
        <LoginButton onSuccess={onLogin} onFailure={onLoginError} />
      </CardContent>
    </Card>
  );
};
