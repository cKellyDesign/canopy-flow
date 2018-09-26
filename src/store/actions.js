// There are three possible states for our login
// process and we need actions for each of them
import { ONAoauth } from '../connectors/Ona/auth';
import { fetchAPIForms } from '../connectors/Ona/forms';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const RECEIVE_FORMS = 'RECEIVE_FORMS';
export const FETCH_FORMS_ERROR = 'FETCH_FORMS_ERROR';

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
    user
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

export const receiveToken = (token) => {
  return {
    type: RECEIVE_TOKEN,
    token,
  }
}

export const receiveForms = (forms) => {
  return {
    type: RECEIVE_FORMS,
    forms
  }
}

export const fetchFormsError = (message) => {
  return {
    type: FETCH_FORMS_ERROR,
    message
  }
}

// todo - Migrate to ONA Connector?
export const loginUser = (token) => {
  const reqConfig = {
    token: token,
    endpoint: 'user',
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(token))
    return ONAoauth(reqConfig, token, dispatch);
  }
}

export const getUserForms = (token) => {
  const reqConfig = {
    token: token,
    endpoint: 'forms',
  }
  return dispatch  => {
    return fetchAPIForms(reqConfig, dispatch);
  }
}

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('state');
    localStorage.removeItem('user');
    dispatch(receiveLogout());
    window.location.reload();
  }
}

export const streamForms = (token) => {
  let config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    return fetch(`https://api.ona.io/api/v1/forms`, config)
    .then(response => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                  controller.close();
                  return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      })
    })
    .then(stream => new Response(stream))
    .then(response => response.json())
    .then(res => {
      console.log("resss", res)
    })
  }
}


export default {
  requestLogin,
  receiveLogin,
  loginError,
  loginUser,
  receiveLogout,
  logoutUser,
  receiveToken,
  receiveForms,
  fetchFormsError,
  getUserForms,
  streamForms,
}


