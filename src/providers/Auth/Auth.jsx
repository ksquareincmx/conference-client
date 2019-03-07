import React from "react";
import { authService, storageService } from "services";

// Context object template
const AuthContext = React.createContext({
  isAuth: false,
  sessionInfo: null,
  onLogin: () => {},
  onLogout: () => {}
});

class AuthProvider extends React.Component {
  state = {
    sessionInfo: {
      user: null,
      jwt: null
    },
    isAuth: false
  };

  componentDidMount() {
    const { getAuthToken, getUserInfo, updateInfoInStorage } = storageService;

    const jwt = getAuthToken();
    const user = getUserInfo();

    if (jwt && user) {
      const sessionInfo = { jwt, user };
      this.setState({ sessionInfo, isAuth: true });
      updateInfoInStorage(sessionInfo);
    }
  }

  onLogin = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      const { login } = authService;
      const res = await login(idToken);
      const { token, expires, refresh_token: refreshToken, user } = res;
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
        const { updateInfoInStorage } = storageService;
        updateInfoInStorage(sessionInfo);
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
      const { updateInfoInStorage } = storageService;
      updateInfoInStorage(sessionInfo);
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

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthProvider };
