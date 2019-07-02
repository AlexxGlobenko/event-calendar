import { connect } from 'react-redux';
import * as eventsActions from '../../store/Events/events.actions';

const mapStateToProps = ({ events, user }) => ({
  userData: user.user,
  currentMonthEvents: events.currentMonthEvents,
});

const mapDispatchToProps = {
  ...eventsActions,
};
export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
