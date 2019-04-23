import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { DrawerBookings } from "components/Drawer";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar.jsx";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";
import { NoteCard } from "components/NoteCard";

class CalendarComponent extends React.Component {
  state = {
    isDBEmpty: false
  };

  handleDBEmpty = () => {
    this.setState({ isDBEmpty: true });
  };

  render() {
    const { isDBEmpty } = this.state;
    const { authContext, bookingsData, onBookingsDataChange } = this.props;
    const { isAuth } = authContext;
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
              <DrawerBookings>
                <BookingsSideBar
                  bookingsData={bookingsData}
                  onBookingsDataChange={onBookingsDataChange}
                />
              </DrawerBookings>
              <Grid item xs={12}>
                {isDBEmpty ? (
                  <NoteCard />
                ) : (
                  <CalendarPageLogic
                    auth={sessionInfo}
                    bookingsData={bookingsData}
                    onBookingsDataChange={onBookingsDataChange}
                    handleDBEmpty={this.handleDBEmpty}
                  />
                )}
              </Grid>
            </Grid>
          </ModalFormProvider>
        </NotificationProvider>
      </Fragment>
    );
  }
}

export const Calendar = withAuthContext(CalendarComponent);
