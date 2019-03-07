import React from "react";
import { bookingService } from "services";
import { withAuthContext } from "../../hocs/Auth";

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
    const { token: authToken } = this.props.context.jwt;
    return bookingService.createOne(booking, authToken);
  };

  getBooking = id => {
    const { token: authToken } = this.props.context.jwt;
    return bookingService.getOne(id, authToken);
  };

  getsListOfBooking = () => {
    const { token: authToken } = this.props.context.jwt;
    return bookingService.getAll(authToken);
  };

  getDetailedListOfBooking = () => {
    const { token: authToken } = this.props.context.jwt;
    return bookingService.getAllWithDetails(authToken);
  };
  modifyBooking = (booking, id) => {
    const { token: authToken } = this.props.context.jwt;
    return bookingService.updateOne(booking, authToken);
  };

  removeBooking = id => {
    const { token: authToken } = this.props.context.jwt;
    return bookingService.deleteOne(id, authToken);
  };

  render() {
    const { children } = this.props.children;
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
const BookingProviderWithAuth = withAuthContext(BookingProvider);
export { BookingProviderWithAuth as BookingProvider, BookingConsumer };
