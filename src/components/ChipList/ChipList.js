import React from 'react'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import cuid from 'cuid';

class ChipList extends React.Component {

  state = {
    chipData: [],
    value: ''
  };

  styles = {
    chip: {
      fontSize: 20,
      marginRight: 24,
      marginBottom: 24,
    }
  }

  handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      const user = { key: cuid(), user: e.target.value }
      this.setState(prevState => ({
        chipData: [...prevState.chipData, user],
        value: ''
      }));
    }

  }

  handleChangeValue = (e) => {
    this.setState({ value: e.target.value })
  }

  handleDelete = data => () => {

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <TextField
            value={this.state.value}
            label='Share'
            placeholder='User email'
            onKeyPress={this.handleEnterPress}
            onChange={this.handleChangeValue}
            style={{ marginBottom: 30, fontSize: 20 }}
          />
        </div>

        <div>
          {this.state.chipData.map(data =>
            <Chip
              style={this.styles.chip}
              key={data.key}
              label={data.user}
              onDelete={this.handleDelete(data)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ChipList;