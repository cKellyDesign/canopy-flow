import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS, RECEIVE_TOKEN } from './actions';

export default function AUTH(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('success') ? true : false
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
    }
  }

    default:
      return state;
  }
}