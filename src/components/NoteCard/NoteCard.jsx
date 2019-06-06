import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 84px)",
    width: "100%"
  },
  note: {
    width: "20%",
    padding: 20,
    backgroundColor: "red"
  },
  txt: {
    color: "white"
  }
});

function NoteCardComponent(props) {
  const { container, note, txt } = props.classes;
  const { title, content } = props;

  return (
    <div className={container}>
      <Paper className={note} elevation={1}>
        <Typography className={txt} variant="h5" component="h3">
          {title}
        </Typography>
        <Typography className={txt} component="p">
          {content}
        </Typography>
      </Paper>
    </div>
  );
}

export const NoteCard = withStyles(styles)(NoteCardComponent);
