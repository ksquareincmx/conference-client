import React, { useState, useEffect } from "react";
import { NavBarRightSide } from "./NavBarRightSide";
import { NavBarWrapper } from "./NavBarWrapper";
import { AvatarButton } from "./AvatarButton";
import { UserNameLabel } from "./UsernameLabel";
import { NavBarMenu } from "./NavBarMenu";
import { storageService } from "services";

export const NavBar = ({ authContext: { onLogout } }) => {
  const [anchorEl, updateAnchorEl] = useState(null);
  const [username, updateUsername] = useState("");

  const handleClick = ({ currentTarget }) => updateAnchorEl(currentTarget);

  const handleClose = () => updateAnchorEl(null);

  useEffect(() => updateUsername(storageService.getUserName()), []);

  return (
    <NavBarWrapper>
      <NavBarRightSide>
        <UserNameLabel username={username} />
        <AvatarButton onClick={handleClick} />
        <NavBarMenu
          anchorEl={anchorEl}
          onClose={handleClose}
          onLogout={onLogout}
        />
      </NavBarRightSide>
    </NavBarWrapper>
  );
};
