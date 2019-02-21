import React from "react";
import AuthService from "services/AuthService";
import { StorageService } from "services/StorageService";
import baseUri from "../../config/baseUri";

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

  authService = AuthService(baseUri + "auth/googlelogin");
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
      const sessionInfo = {
        jwt: {
          token: res.token,
          expires: res.expires,
          refreshToken: res.refresh_token
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
        user: res.user
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
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          sessionInfo: this.state.sessionInfo,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthProvider };
