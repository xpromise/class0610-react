import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
} from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";
import { phoneReg, codeReg } from "@utils/reg";
import { reqSendCode } from "@api/login";

import "./index.css";

const TOTAL_TIME = 6;

class Login extends Component {
  state = {
    isDisabledGetCode: true,
    // 决定是否显示获取验证码
    isSendCode: false,
    time: TOTAL_TIME,
  };

  validator = (rule, value, callback) => {
    let isDisabledGetCode = true;

    if (phoneReg.test(value)) {
      isDisabledGetCode = false;
    }

    this.setState({
      isDisabledGetCode,
    });

    callback();
  };

  goCountry = () => {
    this.props.history.push("/common/countrypicker", "/login");
  };

  // 发送验证码
  sendCode = async () => {
    // isDisabledGetCode不可以点是true
    if (this.state.isDisabledGetCode) return;

    const phone = this.props.form.getFieldValue("phone");
    await reqSendCode(phone);

    this.setState({
      isSendCode: true,
      isDisabledGetCode: true,
    });

    this.timer = setInterval(() => {
      const time = this.state.time - 1;

      if (time <= 0) {
        clearInterval(this.timer);

        this.setState({
          time: TOTAL_TIME,
          isSendCode: false,
          isDisabledGetCode: false,
        });
        return;
      }

      this.setState({
        time,
      });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const {
      form: { getFieldProps },
      location: { state },
    } = this.props;

    const { isDisabledGetCode, isSendCode, time } = this.state;

    const number = state || "+86";

    return (
      <div className="login">
        <NavBar
          mode="light"
          icon={<Icon className="left" type="left" />}
          // onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps("phone", {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
          >
            <div className="phone-prefix" onTouchEnd={this.goCountry}>
              <span>{number}</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            <InputItem
              clear
              placeholder="请输入手机验证码"
              {...getFieldProps("code", {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            />
            <button
              onTouchEnd={this.sendCode}
              className="login-btn-text login-btn"
              style={{
                color: isDisabledGetCode ? "#848689" : "red",
              }}
            >
              {isSendCode ? `重新获取(${time}s)` : "获取验证码"}
            </button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button type="warning" className="warning-btn">
              登录
            </Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <div className="login-btn-wrap">
            <Link to="/login/pwd" className="login-btn-text">
              账户密码登录
            </Link>
            <Link to="/regist/verifyphone" className="login-btn-text">
              手机快速注册
            </Link>
          </div>
          <div className="login-other-text">其他登录方式</div>
          <div className="login-icons">
            <span className="iconfont icon-github"></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <span className="login-private-policy">
            未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
            <Link to="/login" className="login-private-policy-btn">
              硅谷隐私政策
            </Link>
          </span>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(Login);
