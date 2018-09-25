import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS, RECEIVE_TOKEN,
  RECEIVE_FORMS, FETCH_FORMS_ERROR } from './actions';

const defaultState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('access-token') ? true : false,
};

export default function AUTH(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      };
    }

    case RECEIVE_TOKEN: {
      return {
        ...state,
        access_token: action.token,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        userInfo: action.user,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        userInfo: null,
        forms: null,
        access_token: null,
      };
    }

    case RECEIVE_FORMS: {
      return {
        ...state,
        forms: [
          ...action.forms
        ],
      };
    }

    case FETCH_FORMS_ERROR: {
      return {
        ...state,
        formsError: action.message
      };
    }

    default:
      return state;
  }
}