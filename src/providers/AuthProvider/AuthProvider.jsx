import React from "react";
import { authService, storageService } from "services";
import { AuthContext } from "context/AuthContext";
// Context object template

class AuthProvider extends React.Component {
  state = {
    sessionInfo: {
      user: null,
      jwt: null
    },
    isAuth: false
  };

  componentDidMount() {
    const jwt = storageService.getJWT();
    const user = storageService.getUserInfo();

    if (jwt && user) {
      const sessionInfo = { jwt, user };
      this.setState({ sessionInfo, isAuth: true });
      storageService.updateInfoInStorage(sessionInfo);
    }
  }

  onLogin = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      const { login } = authService;
      const res = await login(idToken);
      const { token, user } = res;
      const { exp: expires } = JSON.parse(atob(token.split(".")[1]));
      const refreshToken = expires;
      const sessionInfo = {
        jwt: {
          token,
          expires,
          refreshToken
        },
        user
      };
      this.setState({ sessionInfo, isAuth: true }, () => {
        const { sessionInfo } = this.state;
        storageService.updateInfoInStorage(sessionInfo);
      });
    } catch (err) {
      console.log(err);
    }
  };

  onLogout = () => {
    const sessionInfo = {
      user: null,
      jwt: null
    };
    this.setState({ sessionInfo, isAuth: false }, () => {
      const { sessionInfo } = this.state;
      storageService.updateInfoInStorage(sessionInfo);
    });
  };

  render() {
    const { children } = this.props;
    const { isAuth, sessionInfo } = this.state;
    return (
      <AuthContext.Provider
        value={{
          isAuth,
          sessionInfo,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

const { Consumer: AuthConsumer } = AuthContext;
export { AuthConsumer, AuthProvider };
