import React from "react";
import NavLeftSide from "./LeftSide";
import NavRightSide from "./RightSide";
import NavBarContainer from "./NavBarContainer";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography, IconButton, Button } from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

const styles = {
  navLeftSideButton: {
    backgroundColor: "#7CCE22"
  },
  menuIcon: {
    fontSize: 40,
    color: "#467611"
  },
  typography: {
    color: "black",
    fontFamily: "roboto",
    fontSize: 20
  },
  accountCircle: {
    fontSize: 40,
    color: "#736D6D"
  }
};

function NavBar(props) {
  return (
    <NavBarContainer>
      <NavLeftSide>
        <Button
          variant="fab"
          style={styles.navLeftSideButton}
          aria-label="Edit"
          mini
          component={Link}
          to="/dashboard"
        >
          <MenuIcon style={styles.menuIcon} />
        </Button>
      </NavLeftSide>

      <NavRightSide>
        <Typography style={styles.typography}>{props.userName}</Typography>

        <IconButton color="secondary" aria-label="Menu">
          <AccountCircle style={styles.accountCircle} />
        </IconButton>
      </NavRightSide>
    </NavBarContainer>
  );
}

export default NavBar;
