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
  loginButtonText: {
    width: 200,
    height: 50,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "helvetica",
    position: "relative",
    top: -5,
    left: 10
  },
  loginButtonIcon: {
    color: "#FFFFFF"
  }
});

const LoginButtonComponent = ({
  classes: styleClasses,
  onSuccess,
  onFailure
}) => {
  const { loginButton, loginButtonText, loginButtonIcon } = styleClasses;
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      className={loginButton}
      onSuccess={onSuccess}
      onFailure={onFailure}
    >
      <FontAwesomeIcon
        className={loginButtonIcon}
        icon={faGoogle}
        size="2x"
        transform="left-1"
      />
      <span className={loginButtonText}> Sign in with Google </span>
    </GoogleLogin>
  );
};

export const LoginButton = withStyles(style)(LoginButtonComponent);
