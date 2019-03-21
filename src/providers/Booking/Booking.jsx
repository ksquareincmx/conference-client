import React from "react";
import { bookingService } from "services";

const BookingContext = React.createContext({
  createNewBooking: () => {},
  getBooking: () => {},
  getListOfBooking: () => {},
  modifyBooking: () => {},
  removeBooking: () => {},
  getDetailedListOfBooking: () => {}
});

class BookingProvider extends React.Component {
  createNewBooking = booking => {
    const { token: authToken } = this.props.auth.jwt;
    return bookingService.createOne(booking, authToken);
  };

  getBooking = id => {
    const { token: authToken } = this.props.auth.jwt;
    return bookingService.getOne(id, authToken);
  };

  getsListOfBooking = () => {
    const { token: authToken } = this.props.auth.jwt;
    return bookingService.getAll(authToken);
  };

  getDetailedListOfBooking = filterDate => {
    const { token: authToken } = this.props.auth.jwt;
    return bookingService.getAllWithDetails(authToken, filterDate);
  };
  modifyBooking = (booking, id) => {
    const { token: authToken } = this.props.auth.jwt;
    console.log(bookingService);
    return bookingService.updateOneById(id, booking, authToken);
  };

  removeBooking = id => {
    const { token: authToken } = this.props.auth.jwt;
    return bookingService.deleteOne(id, authToken);
  };

  render() {
    const { children } = this.props;
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
        {children}
      </BookingContext.Provider>
    );
  }
}

const BookingConsumer = BookingContext.Consumer;
export { BookingProvider, BookingConsumer };
