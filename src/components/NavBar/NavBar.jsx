import React, { useState } from "react";
import { NavBarRightSide } from "./NavBarRightSide";
import { NavBarContainer } from "./NavBarWrapper";
import { AvatarButton } from "./AvatarButton";
import { UserNameLabel } from "./UsernameLabel";
import { NavBarMenu } from "./NavBarMenu";
import { storageService } from "services";

export const NavBar = ({ authContext: { onLogout } }) => {
  const [anchorEl, updateAnchorEl] = useState(null);

  const handleClick = ({ currentTarget }) => updateAnchorEl(currentTarget);

  const handleClose = () => updateAnchorEl(null);

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
};
