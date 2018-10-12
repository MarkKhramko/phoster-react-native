import { userConst } from '../constants/userConst';

const initialState = {
  loggedIn: false,
  logout: false,
  user: [],
  email: ''
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConst.LOGIN_REQUEST:
      return { ...state, user: action.user };
    case userConst.LOGIN_SUCCESS:
      return {...state, loggedIn: true, logout: false, email: action.email};
    case userConst.LOGIN_FAILURE:
      return {};
    case userConst.LOGOUT:
      return {...state, loggedIn: false, logout: true, email: ''};
    default:
      return state
  }
}