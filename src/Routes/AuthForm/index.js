import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { LoginForm } from '../../Common/LoginForm';
import { SignUpForm } from '../../Common/SignUpForm';
import connect from './connect';
import protector from '../../HOC/Protector';

class AuthFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  submit = (event) => {
    event.preventDefault();
    const { email, password, name } = this.state;
    this.props.signUp(email, password, name);
  }

  login = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  onTextFieldValueChange = (fieldName) => (event) => {
    this.setState({
      [fieldName]: event.target.value,
    })
  }

  render() {
    const { location } = this.props;
    const { email, name, password } = this.state;
      return (
        <MainContainer>
        <Form noValidate autoComplete="off">
          {location.pathname === '/login' && (
            <LoginForm
              onTextFieldValueChange={this.onTextFieldValueChange}
              email={email}
              password={password}
              submit={this.login}
            />
          )}
          {location.pathname === '/signUp' && (
             <SignUpForm
                onTextFieldValueChange={this.onTextFieldValueChange}
                email={email}
                password={password}
                name={name}
                submit={this.submit}
             />
          )}
        </Form>
        </MainContainer>
      );
  }
}


export default withRouter(protector.ForNoLogin(connect(AuthFormComponent)));

const MainContainer = styled.div`
  display: flex;
  height: calc(100% - 60px);
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, black, 63%,  skyblue);
  max-width: 100%;
  font-family: Arial, Helvetica, sans-serif;
`; 
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;
  margin-bottom: 22px;
  border-radius: 2px;
  width: 30%;
  box-shadow: 0 2px 6px 4px rgba(128, 128, 128, 0.3);
  background-color: white;

  @media (max-width: 800px){
    {
      width: 90%;
    }
  }

  & .textField {
    width: 90%;
    /* height: 30px; */
    margin-bottom: 20px;
  }
  & .submitButton {
    margin-top: 20px;
    width: 90%;
    height: 45px;
  }
`;

