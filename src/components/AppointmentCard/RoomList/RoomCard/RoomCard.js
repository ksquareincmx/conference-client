import React from "react";
import { Card, Grid, CardContent, Divider } from "@material-ui/core/";
import RoomHeader from "components/AppointmentCard/RoomList/RoomCard/RoomHeader";
import RoomLeftHeader from "components/AppointmentCard/RoomList/RoomCard/RoomLeftHeader";
import RoomRightHeader from "components/AppointmentCard/RoomList/RoomCard//RoomRightHeader";
import Button from "components/MaterialButton";

let getStyles = backgroundColor => ({
  card: {
    height: 150,
    marginTop: 20,
    borderRadius: 25,
    padding: 3,
    backgroundColor
  },
  cardContainer: {
    height: "100%"
  }
});

function RoomCard(props) {
  let styles = getStyles(props.backgroundColor);

  let colorStatus = props.presence ? "red" : "green";

  return (
    <Card style={styles.card}>
      <Grid container direction="row" style={styles.cardContainer}>
        <Grid item xs={12}>
          <RoomHeader>
            <RoomLeftHeader roomName={props.roomName} />
            <RoomRightHeader colorStatus={colorStatus} />
          </RoomHeader>
          <Divider />
        </Grid>

        <Grid>
          <CardContent>
            <div>Some information</div>
          </CardContent>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            textButton="Quick Appointment"
            colorButton={props.colorButton}
            onClick={props.onClick(props.roomName, props.roomId)}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default RoomCard;
