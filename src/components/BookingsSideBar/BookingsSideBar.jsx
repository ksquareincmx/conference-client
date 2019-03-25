import React from "react";
import { Grid, Typography, Card } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { SearchBar } from "./SearchBar";
import { BookingList } from "./BookingList/BookingList";

const styles = theme => ({
  sideBar: {
    height: 855,
    width: 460,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "start",
    overflowY: "auto"
  },
  headerCard: {
    width: "100%",
    height: 180,
    marginBottom: 4
  },
  title: {
    marginTop: 25,
    marginLeft: 50,
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "gray"
  }
});

class BookingsSideBarComponent extends React.Component {
  state = {
    searchTerm: ""
  };

  handleOnChangeSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { sideBar, headerCard, title } = this.props.classes;
    const { auth } = this.props;
    return (
      <Grid container className={sideBar}>
        <Card className={headerCard} square elevation={1}>
          <Typography className={title}>Appointments Made</Typography>
          <SearchBar onChange={this.handleOnChangeSearch} />
        </Card>
        <BookingList auth={auth} searchTerm={this.state.searchTerm} />
      </Grid>
    );
  }
}

export const BookingsSideBar = withStyles(styles)(BookingsSideBarComponent);
