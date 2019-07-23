import React, { useState, useEffect } from "react";
import { NavBarRightSide } from "./NavBarRightSide";
import { NavBarWrapper } from "./NavBarWrapper";
import { AvatarButton } from "./AvatarButton";
import { UserNameLabel } from "./UserNameLabel";
import { NavBarMenu } from "./NavBarMenu";
import { storageService } from "services";

export const NavBar = ({ authContext: { onLogout } }) => {
  const [anchorEl, updateAnchorEl] = useState(null);
  const [username, updateUsername] = useState("");
  const [picture, updatePicture] = useState("");

  const handleClick = ({ currentTarget }) => updateAnchorEl(currentTarget);

  const handleClose = () => updateAnchorEl(null);

  // useEffect(() => updateUsername(storageService.getUserName()), []);
  useEffect(() => {
    const userData = storageService.getUserInfo();
    if (userData !== "") {
      updateUsername(userData.name);
      updatePicture(userData.picture);
    }
  });
  return (
    <NavBarWrapper>
      <NavBarRightSide>
        <UserNameLabel username={username} />
        <AvatarButton onClick={handleClick} picture={picture} />
        <NavBarMenu anchorEl={anchorEl} onClose={handleClose} onLogout={onLogout} />
      </NavBarRightSide>
    </NavBarWrapper>
  );
};
