import React from "react";
import NavRightSide from "./RightSide";
import NavBarContainer from "./NavBarContainer";
import { AvatarButton } from "./AvatarButton";
import { UsernameLabel } from "./UsernameLabel";
import { NavBarMenu } from "./NavBarMenu";

import { withAuthContext } from "../../hocs/Auth";

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
    const {
      context: {
        sessionInfo: {
          user: { name }
        },
        onLogout
      }
    } = this.props;

    return (
      <NavBarContainer>
        <NavRightSide>
          <UsernameLabel username={name} />
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

export const NavBarWithAuthContext = withAuthContext(NavBar);
