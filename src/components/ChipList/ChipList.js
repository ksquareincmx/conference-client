import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core'
import cuid from "cuid";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 110,
    overflow: "auto"
  },
  chips: {
    fontSize: 20
  },
  chip: {
    fontSize: 20,
    margin: theme.spacing.unit / 4
  }
});

class ChipList extends React.Component {
  state = {
    chipData: [],
    value: ""
  };

  handleEnterPress = e => {
    if (e.key === "Enter") {
      const user = { key: cuid(), user: e.target.value };
      this.setState(prevState => ({
        chipData: [...prevState.chipData, user],
        value: ""
      }));
    }
  };

  handleChangeValue = e => {
    this.setState({ value: e.target.value });
  };

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props
    return (
      <Grid className={classes.root}>
        <TextField
          fullWidth
          value={this.state.value}
          placeholder="Enter Email"
          className={classes.chips}
          onKeyPress={this.handleEnterPress}
          onChange={this.handleChangeValue}
        />
        <div>
          {this.state.chipData.map(data => (
            <Chip
              className={classes.chip}
              key={data.key}
              label={data.user}
              onDelete={this.handleDelete(data)}
            />
          ))}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChipList);
