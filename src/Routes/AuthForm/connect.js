import { connect } from 'react-redux';

import * as userActions from '../../store/User/user.actions';

const mapStateToProps = ({ user }) => ({
  userData: user.user,
});

const mapDispatchToProps = {
  ...userActions,
};
export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
