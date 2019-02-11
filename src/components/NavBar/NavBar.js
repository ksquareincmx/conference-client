import React from "react";
import NavRightSide from "./RightSide";
import NavBarContainer from "./NavBarContainer";
import { Typography, IconButton, Avatar } from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavBarMenu from "./NavBarMenu";
import capitalize from "lodash/fp/capitalize";

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

  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(){

    const { anchorEl } = this.state;
    const { name } = this.props.auth.user;
    const { onLogout } = this.props.auth;

    return (
      <NavBarContainer>
        <NavRightSide>
          <Typography style={styles.typography}>{capitalize(name)}</Typography>
          <IconButton 
            aria-label="Menu"
            aria-owns={anchorEl ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Avatar style={styles.avatar}>
              <AccountCircle style={styles.accountCircle} />
            </Avatar>
          </IconButton>
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
