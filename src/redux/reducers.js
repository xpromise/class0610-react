import { combineReducers } from "redux";
import { GET_USER_SUCCESS } from "./contants";

const initUser = {
  token: localStorage.getItem("token") || "",
};

function user(prevState = initUser, action) {
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
