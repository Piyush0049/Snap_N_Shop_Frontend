
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LOAD_FAIL, USER_LOAD_SUCCESS, USER_LOAD_REQUEST, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST, USER_UPDATEPASS_FAIL, USER_UPDATEPASS_REQUEST, USER_UPDATEPASS_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_FORGOT_FAIL, USER_FORGOT_SUCCESS, USER_FORGOT_REQUEST, FORGOT_RESET_REQUEST, FORGOT_RESET_SUCCESS, FORGOT_RESET_FAIL, ALL_USERS_FAIL, ALL_USERS_SUCCESS, ALL_USERS_REQUEST } from "../components/constants/userconstants";

export const userreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
    case USER_LOAD_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: {}
      };
    case USER_SIGNUP_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      };
    case USER_LOGOUT_SUCCESS:
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        user: {}
      };
    case USER_SIGNUP_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOAD_FAIL:
    case USER_LOGOUT_FAIL:
    case USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload.error
      };
    default:
      return state; // Don't forget the default case
  }
};


export const profilereducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
    case USER_UPDATEPASS_REQUEST:
    case USER_FORGOT_REQUEST:
    case FORGOT_RESET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case USER_UPDATE_SUCCESS:
    case USER_UPDATEPASS_SUCCESS:
    case USER_FORGOT_SUCCESS:
    case FORGOT_RESET_SUCCESS:
      return {
        ...state,
        isupdated: action.payload
      };
    case USER_UPDATE_FAIL:
    case USER_UPDATEPASS_FAIL:
    case USER_FORGOT_FAIL:
    case FORGOT_RESET_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state; // Don't forget the default case
  }
};


export const alluserreducer = (state = { allUsers: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        allUsers: []
      }
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        allUsers: action.payload.users
      }
    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
        error: action.payload.error
      }

    default:
      return state; // Don't forget the default case
  }
}
