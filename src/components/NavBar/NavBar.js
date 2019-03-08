import React from "react";
import NavRightSide from "./RightSide";
import NavBarContainer from "./NavBarContainer";
import { AvatarButton } from "./AvatarButton";
import { UsernameLabel } from "./UsernameLabel";
import { NavBarMenu } from "./NavBarMenu";
import { getUserName } from "../../utils/sessionInfo";

export class NavBar extends React.Component {
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
    const { sessionInfo, onLogout } = this.props.auth;
    const username = getUserName(sessionInfo);

    return (
      <NavBarContainer>
        <NavRightSide>
          <UsernameLabel username={username} />
          <AvatarButton onClick={this.handleClick} />
          <NavBarMenu
            anchorEl={anchorEl}
            onClose={this.handleClose}
            onLogout={onLogout}
          />
        </NavRightSide>
      </NavBarContainer>
    );
  }
}
