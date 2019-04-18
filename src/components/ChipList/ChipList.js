import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { Grid, withStyles, Collapse } from "@material-ui/core";
import cuid from "cuid";
import { isValidMail } from "components/Modals/CreateMeeting/meetingValidations";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: 50,
    marginBottom: 25
  },
  chips: {
    fontSize: "1em"
  },
  chip: {
    fontSize: "1em",
    margin: theme.spacing.unit / 4
  },
  invalid: {
    color: "red"
  },
  chipList: {
    marginTop: 5,
    maxHeight: 36,
    maxWidth: 460,
    overflow: "auto"
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
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  getEmails = chipData => {
    return chipData.map(data => data.email);
  };

  handleEnterPress = e => {
    const input = e.target.value;
    if (e.key === "Enter" && input !== "") {
      if (isValidMail(input)) {
        this.setState({ isInvalidMail: false });
        this.handleBlur();
        const attendee = { key: cuid(), email: input };
        return this.setState(prevState => {
          let emailsList = this.getEmails(prevState.chipData);
          emailsList.push(attendee.email);
          this.props.handleChangeInvite(emailsList);
          return {
            chipData: [...prevState.chipData, attendee],
            value: ""
          };
        });
      }
      this.setState({ isInvalidMail: true });
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

  componentWillReceiveProps(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      const list = props.attendeesList.map(attendeeMail => ({
        key: cuid(),
        email: attendeeMail
      }));
      this.setState({ chipData: list });
    }
  }

  render() {
    const { value, isFocused, isInvalidMail, chipData } = this.state;
    const { classes: styleClasses, isInvalidInvite } = this.props;
    const { root, chips, chip, invalid, chipList } = styleClasses;
    return (
      <Grid className={root}>
        <TextField
          fullWidth
          value={value}
          placeholder="Enter Email"
          className={chips}
          onKeyPress={this.handleEnterPress}
          onChange={this.handleChangeValue}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          error={isInvalidInvite}
        />
        <Collapse in={isFocused}>
          <small>Press enter to add.</small>
        </Collapse>
        <Collapse in={isInvalidMail}>
          <small className={invalid}>Invalid email</small>
        </Collapse>
        <div className={chipList}>
          {chipData.map(data => (
            <Chip
              className={chip}
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
