import React from "react";
import * as colors from "styles/colors";

const toHumanHour = (date: string): string => {
  const d = new Date(date);
  const hours = d.getUTCHours();
  let minutes = String(d.getMinutes());
  minutes = minutes === "0" ? "00" : `${minutes}`;

  return `${hours}:${minutes}`;
};

export const BookingItem: React.FC<any> = props => {
  const { booking } = props;

  return (
    <div
      style={{
        border: `1px solid ${colors.STROKE}`,
        borderRadius: "4px",
        boxSizing: "border-box",
        marginBottom: "1rem",
        padding: "1rem",
        color: "#000",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>
        {booking.description}
      </h3>
      <span
        style={{
          backgroundColor: booking.roomColor,
          borderRadius: "100%",
          display: "inline-block",
          height: "0.5rem",
          verticalAlign: "middle",
          width: "0.5rem",
        }}
      ></span>
      <p
        style={{
          display: "inline-block",
          margin: "0 0 0 0.5rem",
          verticalAlign: "middle",
        }}
      >
        Room {booking.room.id} - {booking.room.name}
      </p>
      <div style={{ marginLeft: "1rem" }}>
        <p style={{ margin: 0 }}>
          {toHumanHour(booking.start)} - {toHumanHour(booking.end)}
        </p>
      </div>
    </div>
  );
};
