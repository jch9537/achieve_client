import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "../../api";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeSignout: false
    };
  }
  implementSignOut = () => {
    let body = {
      userId: this.props.userId
    };
    api("/user/signout", "POST", body)
      .then(res => {
        alert(res.message);
        this.setState({ completeSignout: !this.state.completeSignout });
      })
      .catch(error => {
        console.log("로그아웃 에러발생", error);
        if (error.status === 401) {
          alert(error.message);
        } else if (error.status === 500) {
          alert(error.message);
        }
      });
  };
  render() {
    const { completeSignout } = this.state;

    if (completeSignout) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <button onClick={this.implementSignOut}>SignOut</button>
        </div>
      );
    }
  }
}

export default SignOut;
