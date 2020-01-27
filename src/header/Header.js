import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SignOut from "../components/sign/signout";

class Header extends Component {
  render() {
    const { userId, history } = this.props;
    console.log("헤더프롭", this.props);

    return (
      <div style={{ backgroundColor: "#ddceed", padding: 10 }}>
        <div>
          <h2>Header</h2>
          <div>
            <NavLink to={`/${userId}/main`}>Home</NavLink>
          </div>
          <div>
            <NavLink to={`/${userId}/setting`}>Setting</NavLink>
          </div>
          <SignOut userId={userId} />
          <button onClick={history.goBack}>뒤로가기</button>
        </div>
      </div>
    );
  }
}

export default Header;
