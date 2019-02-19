import React from "react";

import "./Login.css";
import LoginCard from "./LoginCard";
import LoginButton from "./LoginButton";
import WithAuthContext from "../../hocs/Auth";

import { Redirect } from "react-router-dom";

function Login({ context: { jwt, onLogin } }) {
  if (jwt) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LoginCard>
      <LoginButton onLogin={onLogin} />
    </LoginCard>
  );
}

export default WithAuthContext(Login);
