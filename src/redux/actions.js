import { reqLoginUser } from "@api/login";
import { GET_USER_SUCCESS } from "./contants";
// 同步action
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, data: user });

// 异步action
export const getUser = (phone, password) => {
  return async (dispatch) => {
    // 执行异步操作 - 登录
    const result = await reqLoginUser(phone, password);
    // 调用dispatch方法触发redux更新
    const action = getUserSuccess(result.user);
    dispatch(action);
  };
};
