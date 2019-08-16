import React from "react";
import { authService, storageService } from "services";
import { AuthContext } from "context/AuthContext";
import queryString from "query-string";
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
    const params = queryString.parse(window.location.search);
    let jwt = this.decryptToken(params.access_token);
    let user = params.user;

    if (!(jwt && user)) {
      jwt = storageService.getJWT();
      user = storageService.getUserInfo();
    }

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
      const jwt = this.decryptToken(token);
      const sessionInfo = {
        jwt,
        user
      };
      this.setState({ sessionInfo, isAuth: true }, () => {
        const { sessionInfo } = this.state;
        storageService.updateInfoInStorage(sessionInfo);
      });
    } catch (err) {
      this.onLogout();
      console.log(err);
    }
  };

  decryptToken(token) {
    if (!token) {
      return null;
    }

    const { exp: expires } = JSON.parse(atob(token.split(".")[1]));
    const refreshToken = token;
    const jwt = {
      token,
      expires,
      refreshToken
    };
    return jwt;
  }

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
