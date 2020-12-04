import types from '../types';
import Cookie from "js-cookie";

const STATE = {
  isUserLoggedIn: Cookie.get('email') ? true : false,
};

const userReducer = (state = STATE, action) => {  
  switch (action.type) {
    case types.TOGGLE_LOGIN:
      return { ...state, isUserLoggedIn: !state.isUserLoggedIn }
    default:
      return state;
  }
}

export default userReducer;
