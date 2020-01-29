import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import SignOut from "../components/sign/signout";

class Header extends Component {
  render() {
    const { userInfo, userId, history } = this.props;
    console.log("헤더프롭", this.props);
    if (!userInfo) {
      return null;
    } else {
      return (
        <div style={{ backgroundColor: "#ddceed", padding: 10 }}>
          <div>
            <h2>{`안녕하세요 ${userInfo.name} 님`}</h2>
            <div>
              <NavLink to={`/${userInfo.id}/main`}>Home</NavLink>
            </div>
            <div>
              <NavLink to={`/${userInfo.id}/setting`}>Setting</NavLink>
            </div>
            <SignOut userId={userId} />
            <button onClick={history.goBack}>뒤로가기</button>
          </div>
        </div>
      );
    }
  }
}

export default Header;
