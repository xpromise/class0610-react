import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "/login";

export const reqSendCode = (phone) => {
  return request({
    method: "POST",
    url: `${url_prefix}/digits`,
    data: {
      phone,
    },
  });
};

export const reqLogin = (phone, code) => {
  return request({
    method: "POST",
    url: `${url_prefix}/phone`,
    data: {
      phone,
      code,
    },
  });
};

export const reqLoginUser = (phone, password) => {
  return request({
    method: "POST",
    url: `${url_prefix}/user`,
    data: {
      phone,
      password,
    },
  });
};

export const reqVerifyToken = () => {
  return request({
    method: "POST",
    url: `${url_prefix}/verify`,
  });
};
