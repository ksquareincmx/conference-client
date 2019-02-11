import React from "react";
import UserService from "services/UserService";
import baseUri from "../../config/baseUri";

const UserContext = React.createContext({
  getUser: () => {},
  getUsers: () => {},
  modifyUser: () => {}
});

export const UserConsumer = UserContext.Consumer;
export class UserProvider extends React.Component {
  userService = UserService(baseUri + "User/", this.props.auth.jwt.token);
  getUser = id => {
    return this.userService.getOne(id);
  };

  getUsers = () => {
    return this.userService.getAll();
  };

  modifyUser = (user, id) => {
    return this.userService.updateOne(user, id);
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          getUser: this.getUser,
          getUsers: this.getUsers,
          modifyUser: this.modifyUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
