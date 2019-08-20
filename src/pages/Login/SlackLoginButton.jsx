import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { useStyles } from "hooks/useStyles";

const style = {
  loginButton: {
    width: 300,
    height: 50,
    marginTop: 30,
    borderRadius: 5,
    border: 10,
    background: "#2EB67D",
    boxShadow: "0px 4px 4px #888888",
    cursor: "pointer",
    transition: "box-shadow 300ms",

    "&:hover": {
      boxShadow: "0px 6px 10px #888888"
    }
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
};

export const SlackLoginButton = () => {
  const { loginButton, loginButtonText, loginButtonIcon } = useStyles(style);

  const slackOauth = `https://slack.com/oauth/authorize` +
      `?client_id=${process.env.REACT_APP_SLACK_CLIENT_ID}&scope=${process.env.REACT_APP_SLACK_CLIENT_SCOPE}` +
      `&redirect_uri=${process.env.REACT_APP_SLACK_REDIRECT_URI}`;

  const onClick = async (event) => {
    window.open(slackOauth, "_self");
  };

  return (
      <button onClick={onClick} className={loginButton}>
        <FontAwesomeIcon
            className={loginButtonIcon}
            icon={faSlack}
            size="2x"
            transform="left-1"
        />
        <span className={loginButtonText}> Sign in with Slack </span>
      </button>
  );
};
