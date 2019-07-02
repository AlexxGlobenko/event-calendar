import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core/';

export const SignUpForm = ({ onTextFieldValueChange, email, password, name, submit }) => {
    return (
      <React.Fragment>
        <h1>Sign Up</h1>
        <TextField
          id="outlined-email-input"
          label="Name"
          className="textField"
          value={email}
          onChange={onTextFieldValueChange('email')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          className="textField"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={onTextFieldValueChange('password')}
        />
        <TextField
          id="outlined-name-input"
          label="Name"
          className="textField"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={onTextFieldValueChange('name')}
        />
        <Button variant="contained" className="submitButton" onClick={submit}>SUBMIT</Button>
      </React.Fragment>
    )
}

SignUpForm.propTypes = {
  onTextFieldValueChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  name: PropTypes.string,
  submit: PropTypes.func.isRequired
};

SignUpForm.defaultProps = {
  email: '',
  password: '',
  name: '',
};