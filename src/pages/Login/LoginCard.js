import React from "react";
import { Card, Grid } from "@material-ui/core/";
import CardContent from "@material-ui/core/CardContent";

function LoginCard(props) {
  const styles = {
    card: {
      width: 500,
      height: 300,
      marginRight: 100,
      marginTop: 100,
      marginLeft: 100,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      borderRadius: 20,
    },

    header: {
      backgroundColor: "#DEE8F5",
      color: "#4A90E2",
      fontSize: 40,
      height: 50,
      fontFamily: "roboto",
      fontWeight: "bold",
      paddingTop: 20
    },

    footer: {
      backgroundColor: "#DEE8F5",
      height: 30
    }
  };

  return (
    <Grid container justify="center">
      <Card style={styles.card}>
        <header style={styles.header}>
          <span> Welcome!</span>
        </header>

        <CardContent>{props.children}</CardContent>

        <div style={styles.footer} />
      </Card>
    </Grid>
  );
}

export default LoginCard;
