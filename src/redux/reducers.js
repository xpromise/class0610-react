import { combineReducers } from "redux";
import { GET_USER_SUCCESS } from "./contants";

function user(prevState = {}, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data;
    default:
      return prevState;
  }
}

export default combineReducers({
  user,
});
