import React from "react";
import { Redirect } from "react-router-dom";

import { LoginCard } from "./LoginCard";
import { LoginButton } from "./LoginButton";
import { WelcomeMessage } from "./WelcomeMessage";
import { CompanyLogo } from "./CompanyLogo";

import { withAuthContext } from "../../hocs/Auth";
import { withStyles } from "@material-ui/core/";

import background from "./login.jpg";

const style = theme => ({
  loginPage: {
    backgroundImage: `url(${background})`,
    height: "100vh",
    width: "100vw",
    backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
});

function Login({ context: { isAuth, onLogin }, classes: { loginPage } }) {
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={loginPage}>
      <LoginCard>
        <CompanyLogo />
        <WelcomeMessage />
        <LoginButton onLogin={onLogin} />
      </LoginCard>
    </div>
  );
}

export const LoginWithAuthContext = withStyles(style)(withAuthContext(Login));
