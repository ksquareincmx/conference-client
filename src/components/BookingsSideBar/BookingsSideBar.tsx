import React from "react";
import { Grid, Typography, Card } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
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

const BookingsSideBarComponent: React.FC<any> = props => {
  const {
    bookingsData,
    onBookingsDataChange,
    classes: { siderBarContainer, searchBarCard, searchBarCardTittle },
  } = props;

  return (
    <Grid container className={siderBarContainer}>
      <Card className={searchBarCard} square elevation={1}>
        <Typography className={searchBarCardTittle}>
          Appointments Made
        </Typography>
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
