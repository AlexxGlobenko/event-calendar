import firebase from '../../Core/firebase';

const IS_USER_AUTHENTICATED = 'IS_USER_AUTHENTICATED';
const SIGN_UP = 'SIGN_UP';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const isUserAuthenticated = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch({
        type: IS_USER_AUTHENTICATED,
        userData: user,
      })
    })
  }
}

export const signUp = (email, password, name) => {
  return async (dispatch) => {
    try {
      const signUpResult = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if(signUpResult) {
        await firebase.database().ref(`users/${signUpResult.user.uid}`).set({ name });
          dispatch({
            type: SIGN_UP,
            user: { name, ...signUpResult },
          });
      }
    } catch(err) {
      alert(err.message);
    }
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({
      type: LOG_IN,
      user,
    })
  }
}

export const logOut = () => {
  return async (dispatch) => {
    try{
      const logoutRes = await firebase.auth().signOut();
      if (logoutRes) {
        dispatch({
          type: LOG_OUT,
        })
      }
    } catch(err) {
      alert(err.message);
    }
  }
}

