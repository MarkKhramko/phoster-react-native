import { userActions } from '../constants/userActions';

const initialState = {
  isLoggedIn: false,
  token: null,
  username: null
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return { ...state, user: action.user };
    case userActions.LOGIN_SUCCESS:
      return {...state, loggedIn: true, logout: false, email: action.email};
    case userActions.LOGIN_FAILURE:
      return {};
    case userActions.LOGOUT:
      return {...state, loggedIn: false, logout: true, email: ''};
    default:
      return state
  }
}