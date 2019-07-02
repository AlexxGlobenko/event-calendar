import { connect } from 'react-redux';

import * as userActions from '../store/User/user.actions';
import * as eventsActions from '../store/Events/events.actions';

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isAuthorized: user.isAuthorized,
});

const mapDispatchToProps = {
  ...userActions,
  ...eventsActions,
};
export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
