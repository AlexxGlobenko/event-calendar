import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const connectFunction = connect(
  (state) => ({
    user: state.user.user
  })
);


const protector = {
  ForLogin: (Page) => {
    return connectFunction(
      class ForLogin extends Component {

        render() {
          const { user } = this.props;

          if (!user) {
            return <Redirect to="/login" />;
          }

          return <Page {...this.props} />;
        }
      }
    );
  },

  ForNoLogin: (Page) => {
    return connectFunction(
      class ForNoLogin extends Component {

        render() {
          const { user } = this.props;

          if (!user) {  return <Page {...this.props} />; }

          return <Redirect to="/calendar" />;
        }
      }
    );
  },
};

export default protector;