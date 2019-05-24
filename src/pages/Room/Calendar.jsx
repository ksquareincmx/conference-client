import React, { Fragment } from "react";
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
  const [isDBEmpty, setIsDBEmpty] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleDBEmpty = () => {
    setIsDBEmpty(true);
  };

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const { authContext, bookingsData, onBookingsDataChange, URLRoomId } = props;
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
                bookingsData={bookingsData}
                onBookingsDataChange={onBookingsDataChange}
              />
            </DrawerBookings>
            <Grid item xs={12}>
              {isDBEmpty && <NoteCard />}

              {!isDBEmpty && (
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
