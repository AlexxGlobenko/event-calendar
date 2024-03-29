import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core/';

export const LoginForm = ({ onTextFieldValueChange, email, password, submit }) => {
    return (
      <React.Fragment>
        <h1>LOGIN</h1>
        <TextField
          id="outlined-email-input"
          type="email"
          label="Email"
          className="textField"
          value={email}
          onChange={onTextFieldValueChange('email')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-password-input"
          type="password"
          label="Password"
          className="textField"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={onTextFieldValueChange('password')}
        />
        <Button variant="contained" className="submitButton" onClick={submit}>Login</Button>
      </React.Fragment>
    )
}

LoginForm.propTypes = {
  onTextFieldValueChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  submit: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  email: '',
  password: '',
};
