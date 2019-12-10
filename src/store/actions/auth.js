import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhDPNx67P7jkCOWyMJkYkTZ2sAnvyQtwk';
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhDPNx67P7jkCOWyMJkYkTZ2sAnvyQtwk';
    }
    axios
      .post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
