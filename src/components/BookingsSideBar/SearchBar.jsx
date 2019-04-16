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
    fontSize: 18,
    width: "calc(100% - 48px)"
  },
  iconButton: {
    borderRadius: 5
  }
});

const SearchBarComponent = ({ classes: styleClasses, onChange }) => {
  const { searchBar, iconButton, input } = styleClasses;
  return (
    <Paper className={searchBar} elevation={0}>
      <IconButton className={iconButton} disabled>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={input}
        placeholder="Search within results"
        onChange={onChange}
      />
    </Paper>
  );
};

export const SearchBar = withStyles(styles)(SearchBarComponent);
