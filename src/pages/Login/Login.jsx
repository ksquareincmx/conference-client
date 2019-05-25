import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/";
import background from "./login.jpg";
import { LoginErrorCard } from "./LoginErrorCard";
import { LoginCard } from "./LoginCard";
import { withAuthContext } from "hocs";

const style = () => ({
  loginContainer: {
    backgroundImage: `url(${background})`,
    height: "100vh",
    width: "100vw",
    backgroundPosition: "center",
    backgroundSize: "cover",
    boxSizing: "border-box",
    paddingTop: "10em"
  }
});

const Login = props => {
  const [anErrorOcurred, setAnErrorOcurred] = React.useState(false);

  const handleErrorCardShow = () => {
    setAnErrorOcurred(true);
  };

  const handleErrorCardHide = () => {
    setAnErrorOcurred(false);
  };

  const { authContext, classes } = props;
  const { loginContainer } = classes;
  const { isAuth } = authContext;

  if (isAuth) {
    return <Redirect to="/room/1" />;
  }

  const { onLogin } = authContext;

  return (
    <div className={loginContainer}>
      <LoginCard onLogin={onLogin} onLoginError={handleErrorCardShow} />
      <LoginErrorCard isOpen={anErrorOcurred} onClose={handleErrorCardHide} />
    </div>
  );
};

export const LoginPage = withStyles(style)(withAuthContext(Login));
