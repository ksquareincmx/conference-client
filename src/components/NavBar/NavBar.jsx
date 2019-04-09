import React from "react";
import { NavBarRightSide } from "./NavBarRightSide";
import { NavBarContainer } from "./NavBarContainer";
import { AvatarButton } from "./AvatarButton";
import { UserNameLabel } from "./UsernameLabel";
import { NavBarMenu } from "./NavBarMenu";
import { storageService } from "services";

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
    const {
      authContext: { onLogout }
    } = this.props;
    const username = storageService.getUserName();

    return (
      <NavBarContainer>
        <NavBarRightSide>
          <UserNameLabel username={username} />
          <AvatarButton onClick={this.handleClick} />
          <NavBarMenu
            anchorEl={anchorEl}
            onClose={this.handleClose}
            onLogout={onLogout}
          />
        </NavBarRightSide>
      </NavBarContainer>
    );
  }
}
