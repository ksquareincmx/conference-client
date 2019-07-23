import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { CalendarPageLogic } from "./CalendarPageLogic.jsx";
import { NavBar } from "components/NavBar";
import { DrawerBookings } from "components/Drawer";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";
import { NoteCard } from "components/NoteCard";

const CalendarPage = props => {
  const [isDBEmpty, setIsDBEmpty] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDBEmpty = () => {
    setIsDBEmpty(true);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    authContext,
    allBookingsData,
    bookingsData,
    onBookingsDataChange,
    URLRoomId,
    isLoading: isMainLoading
  } = props;
  const { isAuth } = authContext;

  if (!isAuth && !isLoading) {
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
                bookingsData={allBookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </DrawerBookings>
            <Grid item xs={12}>
              {isMainLoading && <div>Loading...</div>}

              {isDBEmpty && !isMainLoading && (
                <NoteCard
                  title={"Rooms not found"}
                  content={
                    "The data base of the application needs to have rooms registered to work."
                  }
                />
              )}

              {!isDBEmpty && !URLRoomId && !isMainLoading && (
                <NoteCard title={"Error 404: Room not found."} content={""} />
              )}

              {!isDBEmpty && URLRoomId && !isMainLoading && (
                <CalendarPageLogic
                  auth={sessionInfo}
                  URLRoomId={URLRoomId}
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

export const Calendar = withAuthContext(CalendarPage);
