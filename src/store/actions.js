// There are three possible states for our login
// process and we need actions for each of them
import { ONAoauth } from '../connectors/Ona/auth';
import { fetchAPIForms, fetchFormFields } from '../connectors/Ona/forms';
import { fetchProjects, fetchProject } from '../connectors/Ona/projects';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const RECEIVE_FORMS = 'RECEIVE_FORMS';
export const FETCH_FORMS_ERROR = 'FETCH_FORMS_ERROR';
export const RECEIVE_FORM_FIELDS = 'RECEIVE_FORM_FIELDS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';
export const SELECTED_FLOW = 'SELECTED_FLOW';
export const SAVE_FLOW = 'SAVE_FLOW';
export const DELETE_FLOW = 'DELETE_FLOW';

export const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  user,
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
});

export const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false,
});

export const receiveToken = token => ({
  type: RECEIVE_TOKEN,
  token,
});

export const receiveForms = forms => ({
  type: RECEIVE_FORMS,
  forms,
});

export const selectedFlow = flow => ({
  type: SELECTED_FLOW,
  flow,
});

export const receiveFormFields = fields => ({
  type: RECEIVE_FORM_FIELDS,
  fields,
});

export const fetchFormsError = message => ({
  type: FETCH_FORMS_ERROR,
  message,
});

export const fetchProjectError = message => ({
  type: FETCH_PROJECT_ERROR,
  message,
});

export const receiveProjects = projects => ({
  type: RECEIVE_PROJECTS,
  projects,
});

export const fetchProjectsError = message => ({
  type: FETCH_PROJECTS_ERROR,
  message,
});

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project,
});

export const saveFlow = flow => ({
  type: SAVE_FLOW,
  flow,
});

export const deleteFlow = flowName => ({
  type: DELETE_FLOW,
  flowName,
});

// todo - Migrate to ONA Connector?
export const loginUser = (token) => {
  const reqConfig = {
    token,
    endpoint: 'user',
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(token));
    return ONAoauth(reqConfig, token, dispatch);
  };
};

export const getUserForms = (token) => {
  const reqConfig = {
    token,
    endpoint: 'forms',
  };
  return dispatch => fetchAPIForms(reqConfig, dispatch);
};

export const getFormFields = (token, formID) => {
  const reqConfig = {
    token,
    endpoint: 'forms',
    extraPath: `${formID}/form.json`,
  };
  return (dispatch) => {
    reqConfig.dispatch = dispatch;
    return fetchFormFields(reqConfig, dispatch);
  };
};

export const getProjects = (token) => {
  const reqConfig = {
    token,
    endpoint: 'projects',
  };

  return dispatch => fetchProjects(reqConfig, dispatch);
};

export const getProject = (token, projectID) => {
  const reqConfig = {
    token,
    endpoint: 'projects',
    extraPath: `${projectID}.json`,
  };

  return (dispatch) => {
    reqConfig.dispatch = dispatch;
    return fetchProject(reqConfig, dispatch);
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('state');
  localStorage.removeItem('user');
  dispatch(receiveLogout());
  window.location.reload();
};

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
  receiveFormFields,
  getFormFields,
  receiveProjects,
  getProjects,
  fetchProjectsError,
  receiveProject,
  getProject,
  fetchProjectError,
  selectedFlow,
  saveFlow,
  deleteFlow,
};
