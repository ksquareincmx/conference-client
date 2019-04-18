import React from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/";
import background from "./login.jpg";
import { LoginErrorCard } from "./LoginErrorCard";
import { LoginCard } from "./LoginCard";
import { withAuthContext } from "hocs";

const style = theme => ({
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

class Login extends React.Component {
  state = {
    anErrorOcurred: false
  };

  handleErrorCardShow = () => {
    this.setState({ anErrorOcurred: true });
  };

  handleErrorCardHide = () => {
    this.setState({ anErrorOcurred: false });
  };

  render() {
    const { authContext, classes } = this.props;
    const { loginContainer } = classes;
    const { isAuth } = authContext;
    if (isAuth) {
      return <Redirect to="/calendar" />;
    }

    const { onLogin } = authContext;
    const { anErrorOcurred } = this.state;
    return (
      <div className={loginContainer}>
        <LoginCard onLogin={onLogin} onLoginError={this.handleErrorCardShow} />
        <LoginErrorCard
          isOpen={anErrorOcurred}
          onClose={this.handleErrorCardHide}
        />
      </div>
    );
  }
}

export const LoginWithAuthContext = withStyles(style)(withAuthContext(Login));
