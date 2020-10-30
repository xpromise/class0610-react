import VerifyPhone from "@pages/regist/VerifyPhone";
import VerifyCode from "@pages/regist/VerifyCode";

// 路由配置文件
const routes = [
  {
    path: "/regist/verifyPhone",
    component: VerifyPhone,
    exact: true,
  },
  {
    path: "/regist/verifycode",
    component: VerifyCode,
    exact: true,
  },
];

export default routes;
