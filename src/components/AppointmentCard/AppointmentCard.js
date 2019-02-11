import React from "react";
import { Card, Grid } from "@material-ui/core/";
import Header from "./Header";
import Content from "./Content";
import "./AppointmentCard.css";

function AppointmentCard(props) {
  return (
    <Grid container justify="center">
      <Card className="card">
        <Header />

        <Grid container className="card-grid-container">
          <Content
            booking={props.booking}
            auth={props.auth}
            roomService={props.roomService}
            userService={props.userService}
          />
        </Grid>
      </Card>
    </Grid>
  );
}

export default AppointmentCard;
