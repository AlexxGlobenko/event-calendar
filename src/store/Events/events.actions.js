import firebase from '../../Core/firebase';

const CREATE_EVENT = 'CREATE_EVENT';
const GET_CURRENT_MONTH_EVENTS = 'GET_CURRENT_MONTH_EVENTS';
const UPDATE_EVENT = 'UPDATE_EVENT';

export const createEvent = (newEventObj, userId, fullDate) => {
  return async (dispatch) => {
    try {
      const createEventRef = firebase.database().ref(`events/${userId}/${fullDate}`).push();
      const eventKey = createEventRef.key;
      newEventObj.eventKey = eventKey;
      await createEventRef.set(newEventObj)
      dispatch({
        type: CREATE_EVENT,
        event: newEventObj,
        date: fullDate,
        eventKey,
      });
    } catch(err) {
      alert(err.message);
    }
  }
}

export const getCurrentMonthEvents = (userId, substringForSearch) => {
  return (dispatch) => {
    firebase.database().ref(`events/${userId}`).orderByKey().startAt(substringForSearch).endAt('\uf8ff').once('value', (snap) => {
      dispatch({
        type: GET_CURRENT_MONTH_EVENTS,
        eventsByDate: snap.val() ? snap.val() : null,
      })
    });
  }
}

export const updateEvent = (editedEventData, userId, fullDate, eventKey) => {
  return (dispatch) => {
    editedEventData.eventKey = eventKey;
    firebase.database().ref(`events/${userId}/${fullDate}/${eventKey}`).update({
      ...editedEventData
    }, (err) => {
      if(err) {
        alert(err.message);
      } else {
        dispatch({
          type: UPDATE_EVENT,
          editedEventData,
          eventKey,
          date: fullDate,
        })
      }
    })
  }
}