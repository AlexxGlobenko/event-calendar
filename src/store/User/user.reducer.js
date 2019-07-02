const initialState = {
  user: null,
  isAuthorized: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case 'IS_USER_AUTHENTICATED':
      return {
        ...state,
        user: action.userData,
        isAuthorized: true,
      }
    case 'SIGN_UP': 
      return {
        ...state,
        user: action.user,
      }
    case 'LOG_IN': 
      return {
        ...state,
        user: action.user,
      }
    case 'LOG_OUT': 
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
};
