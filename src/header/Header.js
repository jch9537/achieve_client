import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import api from "../api";
import SignOut from "../components/sign/signout";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeSignout: false
    };
  }

  implementSignOut = () => {
    let body = {
      userId: this.props.userInfo.id
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
    const { userInfo, history } = this.props;
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
            <SignOut
              userId={userInfo.id}
              completeSignout={this.state.completeSignout}
              implementSignOut={this.implementSignOut}
            />
            <button onClick={history.goBack}>뒤로가기</button>
          </div>
        </div>
      );
    }
  }
}

export default Header;
