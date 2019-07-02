import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import firebase from '../Core/firebase';

export default class index extends Component {

  onLogautPress = () => {
    this.props.logOut();
  }

  render() {
    const { user } = this.props;
    return (
      <HeaderBar>
        <HeaderTitle>Event Calendar</HeaderTitle>
        <HeaderButtonsWrapper>
          {!user && (
            <React.Fragment>
              <Link to="/signUp"><HeaderButton className="signUpButton">Sign Up</HeaderButton></Link>
              <Link to="/login"><HeaderButton component={Link} >Log in</HeaderButton></Link>
            </React.Fragment>
          )}
          {user && (<HeaderButton onClick={this.onLogautPress}>Log out</HeaderButton>)}
        </HeaderButtonsWrapper>
      </HeaderBar>
    )
  }
}

const HeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  background-color: black;
  height: 60px;
`;

const HeaderButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 30px;
  @media (max-width: 700px){
    {
      font-size: 15px;
      margin: 5px;
    }
  }

  .signUpButton {
    background-color: mediumseagreen;
    margin-right: 10px;
  }
`;

const HeaderButton = styled.button`
  background-color: dodgerblue;
  height: 30px;
  width: 100px;
  border: 0px;
  border-radius: 4px;
  color: white;
  font-family: Arial;
  font-weight: bold;
  text-transform: uppercase;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-family: Arial;
  font-size: 30px;
  margin-left: 30px;
  text-transform: uppercase;

  @media (max-width: 700px){
    {
      font-size: 15px;
      margin: 5px;
    }
  }
`;