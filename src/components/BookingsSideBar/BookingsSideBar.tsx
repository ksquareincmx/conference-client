import React from "react";
import { Grid, Card } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { BookingList } from "./BookingList/BookingList";
import * as colors from "styles/colors";

const styles = () => ({
  searchBarCard: {
    width: "100%",
  },
  searchBarCardTittle: {
    color: colors.TEXT,
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: 0,
  },
  searchBarHeader: {
    boxSizing: "border-box",
    paddingBottom: "1.5rem",
    paddingLeft: "2.5rem",
    paddingTop: "2.5rem",
  },
});

const BookingsSideBarComponent: React.FC<any> = props => {
  const {
    bookingsData,
    onBookingsDataChange,
    classes: { searchBarCard, searchBarCardTittle, searchBarHeader },
  } = props;

  return (
    <Grid container>
      <Card className={searchBarCard} square elevation={1}>
        <header className={searchBarHeader}>
          <h2 className={searchBarCardTittle}>My Appointments</h2>
        </header>
      </Card>
      <BookingList
        bookingsData={bookingsData}
        onBookingsDataChange={onBookingsDataChange}
      />
    </Grid>
  );
};

export const BookingsSideBar = withStyles(styles as any)(
  BookingsSideBarComponent,
);
