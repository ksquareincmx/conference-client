import React from "react";
import { InputBase, IconButton, Paper, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  searchBar: {
    background: "#E9E9E9",
    marginTop: 20,
    marginDown: 20,
    marginLeft: 50,
    marginRight: 50
  },
  input: {
    fontSize: 18
  },
  iconButton: {
    borderRadius: 5
  }
});

const SearchBarComponent = props => {
  const { classes } = props;
  return (
    <Paper className={classes.searchBar} elevation={0}>
      <IconButton className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search within results"
      />
    </Paper>
  );
};

export const SearchBar = withStyles(styles)(SearchBarComponent);
