import React from "react";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const style = theme => ({
  loginButton: {
    width: 300,
    height: 50,
    marginTop: 60,
    borderRadius: 5,
    border: 10,
    background: "#F92200",
    boxShadow: "0px 4px 4px #888888"
  },
  buttonText: {
    width: 200,
    height: 50,
    left: 10,
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "helvetica",
    color: "white",
    position: "relative",
    top: -5
  },
  leftIcon: {
    color: "#FFFFFF"
  }
});

export function LoginButtonComponent({ classes: styleClasses, onLogin }) {
  const { loginButton, buttonText, leftIcon } = styleClasses;
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      className={loginButton}
      onSuccess={onLogin}
      onFailure={e => console.log(e)}
    >
      <FontAwesomeIcon
        className={leftIcon}
        icon={faGoogle}
        size="2x"
        transform="left-1"
      />
      <span className={buttonText}> Sign in with Google </span>
    </GoogleLogin>
  );
}

export const LoginButton = withStyles(style)(LoginButtonComponent);
