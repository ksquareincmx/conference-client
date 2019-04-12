import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Grid, CssBaseline } from "@material-ui/core";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { DrawerBookings } from "components/Drawer";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";

const CalendarComponent = ({
  authContext,
  bookingsData,
  onBookingsDataChange
}) => {
  const { isAuth } = authContext;
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  const { sessionInfo } = authContext;
  return (
    <Fragment>
      {/* <NavBar authContext={authContext} />
      <NotificationProvider> */}
      {/* This is SO UGLY */}
      {/* <ModalFormProvider onBookingsDataChange={onBookingsDataChange}>
          <Grid container direction="row">
            <Grid item xs={3}>
              <BookingsSideBar
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </Grid>
            <Grid item xs={9}> */}
      {/* TODO: Pass the onNewBooking function to the Provider */}
      {/* <CalendarPageLogic
                auth={sessionInfo}
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </Grid>
          </Grid>
        </ModalFormProvider>
      </NotificationProvider> */}
      <CssBaseline />
      <NavBar authContext={authContext} />
      <NotificationProvider>
        <ModalFormProvider onBookingsDataChange={onBookingsDataChange}>
          <Grid container direction="row">
            <DrawerBookings>
              <BookingsSideBar
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </DrawerBookings>
            <Grid item xs={12}>
              {/* TODO: Pass the onNewBooking function to the Provider */}
              <CalendarPageLogic
                auth={sessionInfo}
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </Grid>
          </Grid>
        </ModalFormProvider>
      </NotificationProvider>
    </Fragment>
  );
};

export const Calendar = withAuthContext(CalendarComponent);
