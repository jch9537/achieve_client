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
    const aa = "aa"; //session을 넣는다
    api("/user/signout", "POST", { aa }).then(res => {
      if (res.message === "로그아웃완료") {
        this.setState({ completeSignout: !this.state.completeSignout });
      }
    });
  };
  render() {
    const { completeSignout } = this.state;

    if (completeSignout) {
      alert("로그아웃완료");
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
