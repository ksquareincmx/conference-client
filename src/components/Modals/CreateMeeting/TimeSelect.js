import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Select, Grid } from '@material-ui/core/';
import cuid from 'cuid'

class TimeSelect extends React.Component {

  state = {
    hourSelected: '',
    minuteSelected: '',
    disabledMinutes: true,
    hours: [],
    minutes: []

  }

  styles = {
    select: {
      marginTop: 8,
      marginRight: 8,
      width: 75
    }
  }


  AddZeros(time) {
    if (time < 10) {
      return '0' + String(time)
    }
    return String(time)
  }

  TimeFormat() {
    //let time = (this.state.hourSelected + ':' + this.state.minuteSelected + ':' + '00.000Z')
    let time = {
      hour: this.state.hourSelected,
      minute: this.state.minuteSelected
    }
    return time
  }

  HourChangedHandler = (event) => {
    this.setState({
      hourSelected: event.target.value,
      disabledMinutes: false
    })
  }



  MinuteChangedHandler = (event) => {
    this.setState({ minuteSelected: event.target.value, }, () => this.props.SetTime(this.TimeFormat()))

  }

  componentDidMount() {
    const hoursArray = (Array.from(new Array(24), (x, i) => [this.AddZeros(i), false]))
    const minutesArray = (Array.from(new Array(4), (x, i) => [this.AddZeros(i * 15), false]))


    this.setState({
      hours: hoursArray,
      minutes: minutesArray,
    })

  }

  componentDidUpdate() {

    if (this.props.startTime) {
      if (!this.state.hourSelected) {
        this.setState({ hourSelected: this.props.startTime.hour, minuteSelected: this.props.startTime.minute, disabledMinutes: false })
      }
    } else if (this.props.endTime) {
      if (!this.state.hourSelected) {
        this.setState({ hourSelected: this.props.endTime.hour, minuteSelected: this.props.endTime.minute, disabledMinutes: false })
      }
    }
  }

  render() {
    let hours = this.state.hours.map(hour =>
      <MenuItem
        value={hour[0]}
        key={cuid()}>
        {(hour[0])}
      </MenuItem>
    );

    let minutes = this.state.minutes.map(minute =>
      <MenuItem
        value={minute[0]}
        key={cuid()}> {minute[0]}
      </MenuItem>
    );

    return (
      <Grid item xs={6}>
        <FormControl style={{ marginRight: 20, marginBottom: 20 }}>
          <InputLabel >Hour</InputLabel>

          <Select
            value={this.state.hourSelected}
            onChange={this.HourChangedHandler}
            style={this.styles.select}
            disabled={this.props.disabledHour}>
            {hours}
          </Select>
        </FormControl >

        < FormControl style={{ marginRight: 20, marginBottom: 20 }}>
          <InputLabel >Minutes</InputLabel>

          <Select
            value={this.state.minuteSelected}
            onChange={this.MinuteChangedHandler}
            style={this.styles.select}
            disabled={this.state.disabledMinutes}
          >
            {minutes}
          </Select>
        </FormControl>

      </Grid>
    );
  }
}


export default TimeSelect;