const initialState = {
  currentMonthEvents: null,
  gotEvents: false,
};

export const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENT':
      return {
        ...state,
        currentMonthEvents: {
          ...state.currentMonthEvents,
          [action.date]: {
            ...state.currentMonthEvents[action.date],
            [action.eventKey]: {
              ...action.event
            },
          }
        }
      }
    case 'GET_CURRENT_MONTH_EVENTS':
      return {
        ...state,
        currentMonthEvents: action.eventsByDate,
        gotEvents: true
      }
    case 'UPDATE_EVENT':
      return {
        ...state,
        currentMonthEvents: {
          ...state.currentMonthEvents,
          [action.date]: {
            ...state.currentMonthEvents[action.date],
            [action.eventKey]: {
              ...action.editedEventData
            }
          }
        }
      }
    default:
      return state;
  }
};
