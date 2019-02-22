import React from "react";

import "./Login.css";
import { LoginCard } from "./LoginCard";
import { LoginButton } from "./LoginButton";
import { withAuthContext } from "../../hocs/Auth";

import { Redirect } from "react-router-dom";

function Login({ context: { isAuth, onLogin } }) {
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginCard>
      <LoginButton onLogin={onLogin} />
    </LoginCard>
  );
}

export const LoginWithAuthContext = withAuthContext(Login);
