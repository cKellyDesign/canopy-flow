import { history } from './../../helpers/history';
import Actions from './../../store/actions';
import utils from './../../helpers/utils';
import api, { apiFetch } from './api';

// URL Constructor Reference - can be imported and/or encrypted
export const oauthURL = (clientID, callback) => {
  const apiBase = 'https://api.ona.io';
  const apiPath = '/o/authorize/';
  const responseType = 'token';
  const state = 'abc';
  const scope = 'read';
  return `${apiBase}${apiPath}?client_id=${clientID}&response_type=${responseType}&redirect_uri=${callback}&state=${state}&scope=${scope}`;
};

// Deprecated? Call /user API Endpoint to confirm ONA Oauth2 AuthZ
export const ONAoauth = (reqConfig, token, dispatch) => {
  return api(reqConfig).then(({ user, res }) => {
    if (!res.ok) {
      dispatch(Actions.loginError(user.detail));
      console.log('!res.ok', user);
      window.authRes = res;
      history.replace('/login');
    } else {
      try {
        localStorage.setItem("access_token", token);
      } catch(e) {
        //
      }
      dispatch(Actions.receiveLogin(user));
      history.replace('/');
    }
  }).catch(err => console.log("Error: ", err));
};

// USER API request used for Authorization
export const getUser = async (accessToken) => {
  if (typeof accessToken !== 'string') return false;

  return apiFetch({
    token: accessToken,
    endpoint: 'user',
  }, user => {
    try {
      return user;
    } catch (e) {
      return false;
    }
  });
}

// Saves info into localStorage and dispatches login action
export const defaultAuthZ = (accessToken, user, tokenExpiry, dispatch) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('expires_in', tokenExpiry);
  localStorage.setItem('time_of_login', new Date().getTime());
  localStorage.setItem('user', JSON.stringify(user));
  dispatch(Actions.receiveLogin(user));
}

// Checks for saved info in localStorage and returns boolean
export const isDefaultAuthZ = () => {
  if (!localStorage.getItem('access_token')) return false;
  if (!localStorage.getItem('user')) return false;
  // todo - add session expry here
  return true;
}

// Removes info from localStorage and dispatches logout action
export const defaultDeAuthZ = (dispatch) => {
  dispatch(Actions.logoutUser());
}

// authorizeUser checks user authorization and dispatches pass/fail actions
export const authorizeUser = async (dispatch, passURI, failURI) => {
  // 1) Get accessToken from URI
  const accessToken = utils.getAccessToken();
  const tokenExpiry = utils.getTokenExpiry() * 1000; // convert to miliseconds
  dispatch(Actions.receiveToken(accessToken));

  // 2) check API user call for authZ
  const user = await getUser(accessToken);

  // 3) if pass, save authorized state, else deauthorize
  if (user) {
    defaultAuthZ(accessToken, user, tokenExpiry, dispatch);
    // return history.push((passURI || '/'));
  } else {
    defaultDeAuthZ(dispatch);
  }

  // 4) Redirect to passing/failing URI
  return user
    ? history.push((passURI || '/'))
    : history.push((failURI || '/login'));
}

export class Oauth2 {
  constructor() {
    this.getOauthURL = oauthURL;
    this.getUser = ONAoauth;
    this.authorizeUser = authorizeUser;
    this.defaultAuthZ = defaultAuthZ;
    this.isDefaultAuthZ = isDefaultAuthZ;
    this.defaultDeAuthZ = defaultDeAuthZ;
    this.getUser = getUser;
  }
}

export default {
  oauthURL,
  ONAoauth,
};
