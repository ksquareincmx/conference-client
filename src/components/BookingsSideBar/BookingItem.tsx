import React from "react";
import * as colors from "styles/colors";
import styled from "styled-components";

const toHumanHour = (date: string): string => {
  const d = new Date(date);
  const hours = d.getUTCHours();
  let minutes = String(d.getMinutes());
  minutes = minutes === "0" ? "00" : `${minutes}`;

  return `${hours}:${minutes}`;
};

export const BookingItemContainer = styled.div`
  border: 1px solid ${colors.STROKE};
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 1rem;
  color: ${colors.TEXT};
`;

export const BookingItemDesc = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

export interface IBookingItemColorProps {
  color: string;
}

export const BookingItemColor = styled.div<IBookingItemColorProps>`
  background-color: ${props => props.color};
  border-radius: 100%;
  display: inline-block;
  height: 0.5rem;
  vertical-align: middle;
  width: 0.5rem;
`;

export const BookingItemRoom = styled.div`
  display: inline-block;
  margin: 0 0 0 0.5rem;
  vertical-align: middle;
`;

export const BookingItemTime = styled.p`
  margin: 0;
  margin-left: 1rem;
`;

export const BookingItem: React.FC<any> = ({ booking }) => {
  return (
    <BookingItemContainer>
      <BookingItemDesc>{booking.description}</BookingItemDesc>
      <BookingItemColor color={booking.roomColor} />
      <BookingItemRoom>
        Room {booking.room.id} - {booking.room.name}
      </BookingItemRoom>
      <BookingItemTime>
        {toHumanHour(booking.start)} - {toHumanHour(booking.end)}
      </BookingItemTime>
    </BookingItemContainer>
  );
};
