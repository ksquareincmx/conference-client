import React from "react";
import { GoogleLogin } from "react-google-login";
import googleClientID from "config/googleClientID";

export function LoginButton({ onLogin }) {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      className="login-button"
      onSuccess={onLogin}
      onFailure={e => console.log(e)}
    />
  );
}
