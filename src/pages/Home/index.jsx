import React, { Component } from "react";
import { Card } from "antd-mobile";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { verifyToken } from "@redux/actions";

class Home extends Component {
  state = {
    isLogin: false, // 是否登录
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const message = await this.props.verifyToken();
    if (message) {
      // 2. token验证失败 显示未登录
      this.setState({
        isLogin: false,
        isLoading: false,
      });

      return;
    }

    // 1. token验证成功 显示用户数据
    this.setState({
      isLogin: true,
      isLoading: false,
    });
  }

  render() {
    // 1. token验证成功 显示用户数据
    // 2. token验证失败 显示未登录
    // 3. 验证token，显示loading
    const { isLoading, isLogin } = this.state;
    // console.log(this.props.user);

    if (isLoading) {
      return <h1>loading...</h1>;
    }

    if (isLogin) {
      const { avatar, username } = this.props.user;

      return (
        <Card>
          <Card.Header title={`用户名: ${username}`} />
          <Card.Body>
            <img src={avatar} alt="avatar" />
          </Card.Body>
        </Card>
      );
    }

    return (
      <h1>
        用户未登录，请进行<Link to="/login">登录</Link>
      </h1>
    );
  }
}

export default connect((state) => ({ user: state.user }), { verifyToken })(
  Home
);
