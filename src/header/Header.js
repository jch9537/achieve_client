import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import api from "../util/api";
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
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand mb-0 h1">
              Achieve
              <span
                style={{
                  backgroundColor: "#17a2b8",
                  marginLeft: "10%",
                  paddingTop: "0.2em",
                  paddingBottom: "0.2em",
                  paddingRight: "0.6em",
                  paddingLeft: "0.6em",
                  borderRadius: "10rem",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700
                }}
              >
                {userInfo.name}
              </span>
            </span>
            <ul
              className="nav justify-content-end"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <li className="nav-item">
                <NavLink
                  to={`/${userInfo.id}/main`}
                  style={{ textDecoration: "none" }}
                >
                  <span className="nav-link">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={history.goBack}
                  style={{ color: "#3d83fa" }}
                >
                  Back
                </span>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/${userInfo.id}/setting`}
                  style={{ textDecoration: "none" }}
                >
                  <span className="nav-link">Setting</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  <SignOut
                    userId={userInfo.id}
                    completeSignout={this.state.completeSignout}
                    implementSignOut={this.implementSignOut}
                  />
                </span>
              </li>
              <li className="nav-item" style={{ marginLeft: "3%" }}></li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Header;
