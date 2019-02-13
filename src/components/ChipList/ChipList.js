import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { Grid, withStyles, Collapse } from "@material-ui/core";
import cuid from "cuid";
import {isValidMail} from "../Modals/CreateMeeting/meetingValidations";

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
  },
  invalid:{
    color:"red"
  }
});

class ChipList extends React.Component {
  state = {
    chipData: [],
    value: "",
    isFocused: false,
    isValidMail: false
  };

  handleFocus = () => {
    this.setState({isFocused: true});
  }

  handleBlur = () => {
    this.setState({isFocused: false});
  }

  getEmails = (chipData) =>{
    return chipData.map(data => data.email);
  }

  handleEnterPress = e => {
    const input = e.target.value;
    if (e.key === "Enter" && input !== "") {
      if (isValidMail(input)) {
        this.setState({isInvalidMail: false});
        this.handleBlur();
        const attendee = { key: cuid(), email: input };
        this.setState(prevState => { 
          let emailsList= this.getEmails(prevState.chipData);
          emailsList.push(attendee.email);
          this.props.handleChangeInvite(emailsList);
          return ({
            chipData: [...prevState.chipData, attendee],
            value: ""
          });
        });
      } else {
        this.setState({isInvalidMail: true});
      }
    }
  };

  handleChangeValue = e => {
    this.handleFocus();
    this.setState({ value: e.target.value });
  };

  handleDelete = data => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      let emailsList = this.getEmails(chipData);
      this.props.handleChangeInvite(emailsList);
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
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          error={this.props.isInvalidInvite}
        />
        <Collapse in={this.state.isFocused}>
          <small>Press enter to add.</small>
        </Collapse>
        <Collapse in={this.state.isInvalidMail}>
          <small className={classes.invalid}>Invalid email</small>
        </Collapse>
        <div>
          {this.state.chipData.map(data => (
            <Chip
              className={classes.chip}
              key={data.key}
              label={data.email}
              onDelete={this.handleDelete(data)}
            />
          ))}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChipList);
