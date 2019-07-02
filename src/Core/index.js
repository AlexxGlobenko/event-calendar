import React from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Header from '../Common/Header';
import Calendar from '../Routes/Calendar/Calendar';
import AuthFrom from '../Routes/AuthForm';
import DayShedule from '../Routes/DayShedule/DayShedule';
import firebase from './firebase';
import connect from './connect';


class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isAuthorized: false,
  //   }
  // }

  componentDidMount() {
    const { isUserAuthenticated } = this.props;
    isUserAuthenticated();
  }

  render() {
    const { user, login, signUp, logOut, isAuthorized } = this.props;
    if (!isAuthorized) { return null }
    return (
      <BrowserRouter>
        <Header  user={user} logOut={logOut} />
        <Switch>
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


export default connect(App);
