import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS, RECEIVE_TOKENS } from './actions';

export default function AUTH(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('public_token') ? true : false,
  triggerSpinner: false,
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
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
      triggerSpinner: false,
    }
  }

  case RECEIVE_TOKENS: {
    return {
      ...state,
      triggerSpinner: true,
      tokens: {
        ...action.tokens
      }
    }
  }

    default:
      return state;
  }
}