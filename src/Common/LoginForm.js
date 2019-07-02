import React, { Component } from 'react';
import { Button, Container, TextField, FormControl } from '@material-ui/core/';
import styled from 'styled-components';

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
          defaultValue=""
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
