import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/";
import { LoginCard } from "./LoginCard";
import { withAuthContext } from "hocs";
import background from "./login.jpg";

const style = theme => ({
  loginPage: {
    backgroundImage: `url(${background})`,
    height: "100vh",
    width: "100vw",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
});

const Login = ({ authContext, classes: { loginPage } }) => {
  const { isAuth } = authContext;
  if (isAuth) {
    return <Redirect to="/calendar" />;
  }

  const { onLogin } = authContext;
  return (
    <div className={loginPage}>
      <LoginCard onLogin={onLogin} />
    </div>
  );
};

export const LoginWithAuthContext = withStyles(style)(withAuthContext(Login));
