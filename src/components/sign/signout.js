import React, { Component } from "react";

import api from "../../api";

class SignOut extends Component {
  // state = {  }
  implementSignOut = () => {
    const aa = "aa";
    api("user/signout", "POST", { aa }).then(res =>
      console.log("로그아웃", res)
    );
  };
  render() {
    return (
      <div>
        <button onClick={this.implementSignOut}>SignOut</button>
      </div>
    );
  }
}

export default SignOut;
