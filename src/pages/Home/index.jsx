import React, { Component } from "react";
import { Card } from "antd-mobile";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    // console.log(this.props.user);
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
}

export default connect((state) => ({ user: state.user }))(Home);
