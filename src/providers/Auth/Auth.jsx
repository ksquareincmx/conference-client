import React from "react";
import AuthService from "services/AuthService";
import { StorageService } from "services/StorageService";

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

  authService = AuthService(
    process.env.REACT_APP_SERVER_URI + "auth/googlelogin"
  );
  storageService = StorageService();

  componentDidMount() {
    const jwt = this.storageService.getAuthToken();
    const user = this.storageService.getUserInfo();

    if (jwt && user) {
      const sessionInfo = { jwt, user };
      this.setState({ sessionInfo, isAuth: true });
      this.storageService.updateInfoInStorage(sessionInfo);
    }
  }

  onLogin = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      const res = await this.authService.onLogin(idToken);
      const { token, expires, refresh_token: refreshToken, user } = res;
      const sessionInfo = {
        jwt: {
          token,
          expires,
          refreshToken
        },
        /**
         * {
         *  id: number,
         *  email: string,
         *  name: string,
         *  role: string,
         *  picture: string
         * }
         */
        user
      };
      this.setState({ sessionInfo, isAuth: true }, () => {
        const { sessionInfo } = this.state;
        this.storageService.updateInfoInStorage(sessionInfo);
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
      this.storageService.updateInfoInStorage(sessionInfo);
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
