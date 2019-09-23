import React from "react";
import { Grid, Typography, Card } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { SearchBar } from "./SearchBar";
import { BookingList } from "./BookingList/BookingList";

const styles = () => ({
  siderBarContainer: {
    height: 855,
    width: 460,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "start",
    overflowY: "hidden",
  },
  searchBarCard: {
    width: "100%",
    height: 180,
    marginBottom: 4,
  },
  searchBarCardTittle: {
    marginTop: 25,
    marginLeft: 50,
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "gray",
  },
});

export interface IBookingsSideBarState {
  filterTerm: string;
}

class BookingsSideBarComponent extends React.Component<
  any,
  IBookingsSideBarState
> {
  state = {
    filterTerm: "",
  };

  handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filterTerm: event.target.value });
  };

  render() {
    const { filterTerm } = this.state;

    const {
      bookingsData,
      onBookingsDataChange,
      classes: { siderBarContainer, searchBarCard, searchBarCardTittle },
    } = this.props;

    return (
      <Grid container className={siderBarContainer}>
        <Card className={searchBarCard} square elevation={1}>
          <Typography className={searchBarCardTittle}>
            Appointments Made
          </Typography>
          <SearchBar onChange={this.handleChangeSearch} />
        </Card>
        <BookingList
          bookingsData={bookingsData}
          filterTerm={filterTerm}
          onBookingsDataChange={onBookingsDataChange}
        />
      </Grid>
    );
  }
}

export const BookingsSideBar = withStyles(styles as any)(
  BookingsSideBarComponent,
);
