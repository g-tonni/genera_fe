import { ADD_TOKEN, ADD_USER_ID } from "../actions/loginAction";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authReducer = function (currentState = initialState, action) {
  switch (action.type) {
    case ADD_TOKEN: {
      return {
        ...currentState,
        token: action.payload,
      };
    }
    case ADD_USER_ID: {
      return {
        ...currentState,
        userId: action.payload,
      };
    }
    default:
      return currentState;
  }
};

export default authReducer;
