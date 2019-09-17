import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";
import { AuthContext } from "context/AuthContext";
import { useInterval } from "hooks/useInterval";

const CalendarContainerComponent = ({ URLRoomId, history }) => {
  const [bookings, updateBookings] = useState([]);
  const [allBookings, updateAllBookings] = useState([]);
  const [isServerDown, updateIsServerDown] = useState(false);
  const [roomId, updateRoomId] = useState("");
  const [isLoading, updateIsLoading] = useState(true);
  const [shouldFetch, updateShouldFetch] = useState(false);
  const authContext = useContext(AuthContext);
  const [bookingsHash, updateBookingsHash] = useState("initial");
  const [allBookingsHash, updateAllBookingsHash] = useState("initial");
  const [delay] = useState(5000); // TODO: when the tab is not used, augment delay time
  const onBookingsDataChange = () => updateShouldFetch(!shouldFetch);
  const { onLogout } = authContext;

  const fetchBookings = async () => {
    try {
      const reqRoom = await roomService.getOneById(URLRoomId);
      const allData = await bookingService.getAllWithDetails(
        getUTCDateFilter()
      );

      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        URLRoomId
      );
      if (data && allData) {
        const allBookingsData = allData;
        const bookingsData = data;
        // We avoid extra rendering if the data is the same, since this function runs every 1.5 seconds
        const allBookingsDataStr = JSON.stringify(allBookingsData);
        const bookingsDataStr = JSON.stringify(bookingsData);
        if (allBookingsDataStr !== allBookingsHash) {
          updateAllBookings(allBookingsData);
          updateAllBookingsHash(allBookingsDataStr);
        }

        if (bookingsDataStr !== bookingsHash) {
          updateBookings(bookingsData);
          updateBookingsHash(bookingsDataStr);
        }
      } else {
        const { name } = data;
        // The webtoken is invalid for any reason
        if (name === "JsonWebTokenError") {
          onLogout();
          history.push("/login");
          return undefined;
        } else {
          updateIsServerDown(true);
        }
      }
      if (typeof reqRoom === "object") {
        updateIsLoading(false);
        updateRoomId(URLRoomId);
        return undefined;
      }
      // updateIsLoading(true);
      return undefined;
    } catch (error) {
      if (error.status === 401) {
        onLogout();
        history.push("/login");
        return undefined;
      }
      // Don't know how to do this with hooks
      Promise.reject(new Error(error.message));
      return undefined;
    }
  };

  useEffect(() => {
    // TODO: update state ONLY if there's no data;
    fetchBookings();
    // whenever shouldFetch changes, it will call `fetchBookings`
    // eslint-disable-next-line
  }, [shouldFetch]);

  useInterval(() => {
    fetchBookings();
  }, delay);

  if (isServerDown) {
    return <Error500 />;
  }

  return (
    <Calendar
      allBookingsData={allBookings}
      bookingsData={bookings}
      onBookingsDataChange={onBookingsDataChange}
      URLRoomId={roomId}
      isLoading={isLoading}
    />
  );
};

export const CalendarContainer = withRouter(CalendarContainerComponent);
