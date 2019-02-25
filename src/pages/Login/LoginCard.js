import React from "react";
import { Card, Grid, withStyles } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";

const style = theme => ({
  card: {
    width: 375,
    height: 340,
    marginRight: 100,
    marginTop: 200,
    marginLeft: 100,
    marginBottom: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    borderRadius: 10,
    position: "absolute",
    top: 10,
    left: 715,
    overflow: "visible"
  }
});

const LoginCardComponent = ({ classes: { card }, children }) => {
  return (
    <Grid container justify="center">
      <Card className={card}>
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
};

export const LoginCard = withStyles(style)(LoginCardComponent);
