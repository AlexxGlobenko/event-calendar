import React, { Component } from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText, Button, TextField } from '@material-ui/core/';
import PropTypes from 'prop-types'

export default class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      attendees: '',
      place: '',
      time: '',
      description: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { editableEventData } = this.props;
    if(editableEventData !== prevProps.editableEventData && editableEventData) {
      const { title, attendees, place, time, description } = editableEventData;
      this.setState({
        title,
        attendees,
        place,
        time,
        description,
      })
    }
  }

  onChangeEventField = (fieldName, event) => {
    this.setState({
      [fieldName]: event.target.value,
    })
  }

  onAddPress = () => {
    const { submitEvent, eventKey } = this.props;
    const { title, attendees, place, time, description } = this.state;
    submitEvent({ title, attendees, place, time, description }, eventKey);
  }

  render() {
    const { open, onClose, editableEventData } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add event</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              onChange={(event) => this.onChangeEventField('title', event)}
              value={this.state.title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="attendees"
              label="Attendees"
              fullWidth
              placeholder="Input comma separated list"
              onChange={(event) => this.onChangeEventField('attendees', event)}
              value={this.state.attendees}
            />
            <TextField
              autoFocus
              margin="dense"
              id="place"
              label="Place"
              fullWidth
              onChange={(event) => this.onChangeEventField('place', event)}
              value={this.state.place}
            />
            <TextField
              type="time"
              autoFocus
              margin="dense"
              id="time"
              label="Time"
              fullWidth
              onChange={(event) => this.onChangeEventField('time', event)}
              value={this.state.time}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              fullWidth
              multiline
              rowsMax="4"
              onChange={(event) => this.onChangeEventField('description', event)}
              value={this.state.description}
            />
          </DialogContent>
        <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={this.onAddPress} color="primary">
          {editableEventData ? 'EDIT' : 'ADD'}
        </Button>
      </DialogActions>
    </Dialog>
    )
  }
}
