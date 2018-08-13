// There are three possible states for our login
// process and we need actions for each of them
import { Base64 } from 'js-base64'; 
import { history } from '../helpers/history';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  }
}

export const loginUser = (credentials) => {
  let config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${Base64.encode(credentials.username + ':' + credentials.password)}}`,
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(credentials))
    return fetch(`https://api.ona.io/api/v1/projects/49200`, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.detail))
        } else {
          // const usernames = user.users.map(u => u.user);
          // If login was successful, set the token in local storage
          localStorage.setItem('success', response.status)
          // localStorage.setItem('id_token', user.access_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
          history.push('/');
        }
      }).catch(err => console.log("Error: ", err))
  }
}

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('success');
    dispatch(receiveLogout());
  }
}

export default {
  requestLogin,
  receiveLogin,
  loginError,
  loginUser,
  receiveLogout,
  logoutUser,
}