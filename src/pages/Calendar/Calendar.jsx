import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { AuthConsumer } from "providers/Auth";
import CalendarPageLogic from "./CalendarPageLogic";

function VerifyAuth(auth) {
  if (auth.jwt !== null) {
    return (
      <BookingProvider auth={auth}>
        <BookingConsumer>
          {bookingService => (
            <CalendarPageLogic bookingService={bookingService} auth={auth} />
          )}
        </BookingConsumer>
      </BookingProvider>
    );
  }
}

function CalendarPage() {
  return <AuthConsumer>{auth => VerifyAuth(auth)}</AuthConsumer>;
}
export default CalendarPage;
