import React from "react";
import NavRightSide from "./RightSide";
import NavBarContainer from "./NavBarContainer";
import AvatarButton from "./AvatarButton";
import UsernameLabel from "./UsernameLabel";
import NavBarMenu from "./NavBarMenu";
import { throws } from "assert";

const styles = {
  navLeftSideButton: {
    backgroundColor: "#7CCE22"
  },
  menuIcon: {
    fontSize: 40,
    color: "#467611"
  },
  typography: {
    color: "white",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: 20
  },
  accountCircle: {
    fontSize: 50
  },
  avatar: {
    color: "#c4c6c6",
    backgroundColor: "#969696"
  }
};

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { username, onLogout } = this.props;

    return (
      <NavBarContainer>
        <NavRightSide>
          <UsernameLabel username={username} />
          <AvatarButton handleClick={this.handleClick} />

          <NavBarMenu
            anchorEl={anchorEl}
            handleClose={this.handleClose}
            handleLogout={onLogout}
          />
        </NavRightSide>
      </NavBarContainer>
    );
  }
}

export default NavBar;
