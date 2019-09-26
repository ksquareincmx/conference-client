import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { bookingService } from "services";
import { Calendar } from "./Calendar";
import { getUTCDateFilter } from "utils/BookingFilters";
import { AuthContext } from "context/AuthContext";
import { useInterval } from "hooks/useInterval";

const REFRESH_TIME = 5000;

export const CalendarContainer = () => {
  const { roomId } = useParams();
  const history = useHistory();
  const [bookings, updateBookings] = useState([]);
  const [allBookings, updateAllBookings] = useState([]);
  const [isLoading, updateIsLoading] = useState(true);
  const [shouldFetch, updateShouldFetch] = useState(false);
  const authContext = useContext(AuthContext);
  const [bookingsHash, updateBookingsHash] = useState("initial");
  const [allBookingsHash, updateAllBookingsHash] = useState("initial");
  const onBookingsDataChange = () => updateShouldFetch(!shouldFetch);

  const fetchBookings = async () => {
    try {
      const allData = await bookingService.getAllWithDetails(
        getUTCDateFilter()
      );

      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        roomId
      );

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

      return updateIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        authContext.onLogout();
        return history.push("/login");
      }
    } finally {
      updateIsLoading(false);
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
  }, REFRESH_TIME);

  return (
    <Calendar
      allBookingsData={allBookings}
      bookingsData={bookings}
      onBookingsDataChange={onBookingsDataChange}
      isLoading={isLoading}
    />
  );
};
