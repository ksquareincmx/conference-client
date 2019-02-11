import React from "react";
import AuthService from "services/AuthService";
import baseUri from "../../config/baseUri";

const AuthContext = React.createContext({
  user: null,
  jwt: null,
  onLogin: () => { },
  onLogout: () => { }
});

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  authService = AuthService(baseUri + "auth/googlelogin");
  state = {
    user: null,
    jwt: null
  };

  componentDidMount() {
    // this.refreshLocalStorage();
    if (typeof Storage !== "undefined") {
      if (localStorage.getItem("cb_jwt") && localStorage.getItem("cb_user")) {
        const user = JSON.parse(localStorage.getItem("cb_user"));
        const jwt = JSON.parse(localStorage.getItem("cb_jwt"));
        this.setState({ user, jwt });
      }
    }
  }

  onLogin = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    try {
      const res = await this.authService.onLogin(idToken);
      this.setState({
        jwt: {
          token: res.token,
          expires: res.expires,
          refreshToken: res.refresh_token
        },
        user: res.user // { id: number, email: string, name: string, role: string, picture: string }
      });
      this.refreshLocalStorage();
    } catch (err) {
      console.log(err);
    }
  };

  onLogout = () => {
    this.setState({
      user: null,
      jwt: null
    });
    this.refreshLocalStorage();
  };

  refreshLocalStorage() {
    const { user, jwt } = this.state;
    localStorage.setItem("cb_user", JSON.stringify(user));
    localStorage.setItem("cb_jwt", JSON.stringify(jwt));
  }

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
