import React from "react";
import { withStyles } from "@material-ui/core";

const styles = () => ({
  container: {
    margin: 50,
    textAlign: "center",
    backgroundColor: "white",
    boxSizing: "border-box",
    padding: "2rem"
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#2F49A1"
  },
  subTitle: {
    fontSize: "1.5rem"
  },
  pictureList: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "3rem"
  },
  picture: {
    border: "4px solid transparent",
    borderRadius: "100%",
    height: "10rem",
    width: "10rem",
    "&:hover": {
      borderColor: "#00fff9"
    }
  }
});

const Error500Component = props => {
  const { classes: styleClasses } = props;
  const { container, title, subTitle, picture, pictureList } = styleClasses;

  return (
    <div className={container}>
      <h1 className={title}>Whoops... something went wrong</h1>
      <h2 className={subTitle}>Which one of our engineers we should fire?</h2>
      <div className={pictureList}>
        <div>
          <img className={picture} src="/assets/basultos.png" alt="Basultos" />
          <p>Basultos</p>
        </div>
        <div>
          <img className={picture} src="/assets/mijangos.png" alt="Mijangos" />
          <p>Mijangos</p>
        </div>
        <div>
          <img className={picture} src="/assets/salas.png" alt="Salas" />
          <p>Salas</p>
        </div>
      </div>
    </div>
  );
};

export const Error500 = withStyles(styles)(Error500Component);
