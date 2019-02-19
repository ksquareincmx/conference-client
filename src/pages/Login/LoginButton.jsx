import React from "react";
import { GoogleLogin } from "react-google-login";
import googleClientID from "config/googleClientID";

function LoginButton({ onLogin }) {
  return (
    <GoogleLogin
      clientId={googleClientID}
      buttonText="Sign in with Google"
      className="login-button"
      onSuccess={onLogin}
      onFailure={e => console.log(e)}
    />
  );
}

export default LoginButton;
