import { userConst } from '../constants/userConst';

const initialState = {
  registeredSuccess: false,
};

export function register(state = initialState, action) {
  switch (action.type) {
    case userConst.REGISTER_REQUEST:
      return {};
    case userConst.REGISTER_SUCCESS:
      return {...state, registeredSuccess: true };
    case userConst.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
} 