import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Common/Header';
import Calendar from '../Routes/Calendar/Calendar';
import AuthFrom from '../Routes/AuthForm';
import DayShedule from '../Routes/DayShedule/DayShedule';
import connect from './connect';


class App extends React.Component {

  componentDidMount() {
    const { isUserAuthenticated } = this.props;
    isUserAuthenticated();
  }

  redirect = () => {
    return (
      <Redirect to="/calendar" />
    );
  }

  render() {
    const { user, logOut, isAuthorized } = this.props;
    if (!isAuthorized) { return null }
    return (
      <BrowserRouter>
        <Header  user={user} logOut={logOut} />
        <Switch>
        <Route exact path="/" render={this.redirect}/>
          <Route
            exact
            path="/login"
            component={AuthFrom}
          />
          <Route
            exact
            path="/signUp"
            component={AuthFrom}
          />
          <Route
            exact
            path="/calendar"
            component={Calendar}
          />
          <Route
            exact
            path="/calendar/shedule/:pickedDate"
            component={DayShedule}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  user: PropTypes.shape,
  logOut: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  isUserAuthenticated: PropTypes.func.isRequired,
};

App.defaultProps = {
  user: null,
  isAuthorized: false,
};

export default connect(App);
