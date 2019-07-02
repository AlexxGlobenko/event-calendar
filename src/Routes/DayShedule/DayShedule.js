import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core/';
import AddEventModal from '../../Common/AddEventModal';
import connect from './connect';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ExpansionEvent } from '../../Common/ExpansionEvent';
import protector from '../../HOC/Protector';

class DayShedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEventModal: false,
      editableEventData: null,
    }
  }

  componentDidMount() {
    const { currentMonthEvents, getCurrentMonthEvents, userData, location } = this.props;
    if (!currentMonthEvents) {
      getCurrentMonthEvents(userData.uid, `${location.pathname.split('/')[3]}`)
    }
  }

  onShowModalStateChange = () => {
    this.setState((state) => ({
      showAddEventModal: !state.showAddEventModal,
    }))
  }

  submitEvent = (newEventObject, eventId) => {
    const { createEvent, userData, location, updateEvent } = this.props;
    const newEventData = newEventObject;
    const splitedTime = newEventObject.time.split(':');
    newEventData.time = `${location.pathname.split('/')[3]}T${splitedTime[0]}:${splitedTime[1]}:00.000Z`;
    let date = `${location.pathname.split('/')[3]}`;
    if (eventId) {
      updateEvent(newEventObject, userData.uid, date, eventId)
    } else {
      createEvent(newEventObject, userData.uid, date);
    }
    this.onShowModalStateChange();
  }

  onEditClick = (editableEventData, eventKey) => {
    this.setState({
      editableEventData,
      eventKey,
    }, () => {
      this.onShowModalStateChange();
    })
  }

  onBackPressed = () => {
    this.props.history.goBack();
  }

  render() {
    const { showAddEventModal, editableEventData, eventKey } = this.state;
    const { currentMonthEvents, location, gotEvents } = this.props;
    const dateString = location.pathname.split('/')[3]
    const currentDayEvents = (currentMonthEvents && typeof currentMonthEvents[dateString] !== 'undefined') ? currentMonthEvents[dateString] : null;
    if (!gotEvents) { return <StyledMainContainer /> }

    const events = currentDayEvents && Object.keys(currentDayEvents).map(key => currentDayEvents[key]).sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return dateA > dateB ? 1 : dateA === dateB ? 0 : -1;
    });

    return (
      <StyledMainContainer>
        <AddEventModal
          open={showAddEventModal}
          onClose={this.onShowModalStateChange}
          submitEvent={this.submitEvent}
          editableEventData={editableEventData}
          eventKey={eventKey}
        />
        {!currentDayEvents && (
          <div className="nothingFoundWrapper">
            <h1>You haven't any event for this day</h1>
            <h3>Press button to add event</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onShowModalStateChange}
              className="addEventButton"
            >
              ADD EVENT +
              </Button>
          </div>
        )}
        {currentDayEvents && (
          <div className="daySheduleContainer">
            {events.map((event) => {
                return (
                  <ExpansionEvent
                    key={event.eventKey}
                    event={event}
                    onEditClick={this.onEditClick}
                    eventKey={event.eventKey}
                  />
                )
              })}
            <div className="buttonsWrapper">
              <Button
                variant="contained"
                color="primary"
                onClick={this.onBackPressed}
                className="addEventButton"
              >
                BACK
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.onShowModalStateChange}
                className="addEventButton"
              >
                ADD EVENT +
              </Button>
            </div>
          </div>
        )}
      </StyledMainContainer>
    )
  }
}

DayShedule.propTypes = {
  currentMonthEvents: PropTypes.shape(),
  gotEvents: PropTypes.bool,
  getCurrentMonthEvents: PropTypes.func.isRequired,
  userData: PropTypes.shape()
};

DayShedule.defaultProps = {
  currentMonthEvents: null,
  gotEvents: false,
  userData: null,
};

export default withRouter(protector.ForLogin(connect(DayShedule)));

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100% - 60px);
  background: linear-gradient(45deg, black, 63%,  skyblue);
  overflow: auto;
  padding: 30px;

  @media (max-width: 1200px){
    div.daySheduleContainer {
      width: 90%;
    }
  }

  @media (max-width: 800px){
    padding: 3px;
    div.daySheduleContainer {
      padding: 10px;
    }
  }

  .daySheduleContainer {
    width: 40%;
    flex-direction: column;
    font-family: 'Arial';
    text-align: flex-start;
    justify-content: center;
    background-color: white;
    padding: 30px;
    box-shadow: 0 3px 10px 0 rgba(128, 128, 128, 0.6);
    border-radius: 4px;

    .buttonsWrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }

  .nothingFoundWrapper {
    flex-direction: column;
    font-family: 'Arial';
    text-align: center;
    justify-content: center;
    display: flex;
    width: 30%;
    /* height: 100%; */
    background-color: white;
    align-items: center;
    box-shadow: 0 3px 10px 0 rgba(128, 128, 128, 0.6);
    padding: 50px;
    border-radius: 4px;

    .addEventButton {
      margin-top: 22px;
    }
  }
`;

