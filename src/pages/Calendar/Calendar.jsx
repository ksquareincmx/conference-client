import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { DrawerBookings } from "components/Drawer";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { NotificationProvider, ModalFormProvider } from "providers";
import { NoteCard } from "components/NoteCard";
import { AuthContext } from "context/AuthContext";

export const Calendar = ({ bookingsData, onBookingsDataChange }) => {
  const [isDBEmpty, setIsDBEmpty] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isAuth } = React.useContext(AuthContext);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(false);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDBEmpty = () => {
    setIsDBEmpty(true);
  };

  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  const { sessionInfo } = authContext;
  return (
    <Fragment>
      <NavBar authContext={authContext} />
      <NotificationProvider>
        <ModalFormProvider onBookingsDataChange={onBookingsDataChange}>
          <Grid container direction="row">
            <DrawerBookings
              isOpen={isDrawerOpen}
              handleOpen={handleDrawerOpen}
              handleClose={handleDrawerClose}
            >
              <BookingsSideBar
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </DrawerBookings>
            <Grid item xs={12}>
              {isDBEmpty && <NoteCard />}

              {!isDBEmpty && (
                <CalendarPageLogic
                  auth={sessionInfo}
                  bookingsData={bookingsData}
                  onBookingsDataChange={onBookingsDataChange}
                  handleDBEmpty={handleDBEmpty}
                  isDrawerOpen={isDrawerOpen}
                />
              )}
            </Grid>
          </Grid>
        </ModalFormProvider>
      </NotificationProvider>
    </Fragment>
  );
};
