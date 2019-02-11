import React from "react";
import BookingService from "services/BookingService";
import baseUri from "../../config/baseUri";

const BookingContext = React.createContext({
  createNewBooking: () => {},
  getBooking: () => {},
  getListOfBooking: () => {},
  modifyBooking: () => {},
  removeBooking: () => {},
  getDetailedListOfBooking: () => {}
});

export const BookingConsumer = BookingContext.Consumer;

export class BookingProvider extends React.Component {
  bookingService = BookingService(
    baseUri + "Booking/",
    this.props.auth.jwt.token
  );
  createNewBooking = booking => {
    return this.bookingService.createOne(booking);
  };

  getBooking = id => {
    return this.bookingService.getOne(id);
  };

  getsListOfBooking = () => {
    return this.bookingService.getAll();
  };

  getDetailedListOfBooking = () => {
    return this.bookingService.getAllWithDetails();
  };
  modifyBooking = (booking, id) => {
    return this.bookingService.updateOne(booking, id);
  };

  removeBooking = id => {
    return this.bookingService.deleteOne(id);
  };

  render() {
    return (
      <BookingContext.Provider
        value={{
          createNewBooking: this.createNewBooking,
          getBooking: this.getBooking,
          getListOfBooking: this.getsListOfBooking,
          getDetailedListOfBooking: this.getDetailedListOfBooking,
          modifyBooking: this.modifyBooking,
          removeBooking: this.removeBooking
        }}
      >
        {this.props.children}
      </BookingContext.Provider>
    );
  }
}
