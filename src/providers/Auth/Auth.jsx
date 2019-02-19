import React from "react";
import AuthService from "services/AuthService";
import StorageService from "services/StorageService";
import baseUri from "../../config/baseUri";

// Context object template
const AuthContext = React.createContext({
  user: null,
  jwt: null,
  onLogin: () => {},
  onLogout: () => {}
});

class AuthProvider extends React.Component {
  state = {
    user: null,
    jwt: null
  };

  authService = AuthService(baseUri + "auth/googlelogin");
  storageService = StorageService();

  componentDidMount() {
    const jwt = this.storageService.getAuthToken();
    const user = this.storageService.getUserInfo();

    if (jwt && user) {
      const sessionInfo = { jwt, user };
      this.setState(sessionInfo);
      this.storageService.updateInfoInStorage(sessionInfo);
    }
  }

  onLogin = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      const res = await this.authService.onLogin(idToken);
      this.setState(
        {
          jwt: {
            token: res.token,
            expires: res.expires,
            refreshToken: res.refresh_token
          },
          user: res.user // { id: number, email: string, name: string, role: string, picture: string }
        },
        () => {
          const { jwt, user } = this.state;
          this.storageService.updateInfoInStorage({ jwt, user });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  onLogout = () => {
    this.setState(
      {
        user: null,
        jwt: null
      },
      () => {
        const { jwt, user } = this.state;
        this.storageService.updateInfoInStorage({ jwt, user });
      }
    );
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
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
