import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FaLock, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import api from "../../util/api";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: "",
      password: "",
      isLogIn: false
    };
  }

  writeEmail = e => {
    // console.log("로그인 이메일: ", e.target.value);
    let __email = e.target.value;
    this.setState({ email: __email });
  };

  writePassword = e => {
    // console.log("로그인 비밀번호: ", e.target.value);
    let __password = e.target.value;
    this.setState({ password: __password });
  };

  submitSignIn = () => {
    const { email, password, isLogIn } = this.state;
    if (!email) {
      if (!password) {
        alert("로그인정보를 입력해주세요");
      } else {
        alert("email을 입력해 주세요");
      }
    } else if (!password) {
      if (!email) {
        alert("로그인정보를 입력해주세요");
      } else {
        alert("비밀번호를 입력해 주세요");
      }
    } else {
      let body = {
        email: email,
        password: password
      };
      api("/user/signin", "POST", body)
        .then(res => {
          if (res.message === "로그인 완료") {
            console.log("응답", res);
            this.setState({ userId: res.userId, isLogIn: !isLogIn });
          }
        })
        .catch(err => {
          console.log("에러응답", err);
          alert(err.message);
          this.setState({ email: "", password: "" });
        });
    }
  };

  render() {
    const { isLogIn, userId } = this.state;
    console.log("사인인 스테이트", this.state);
    console.log("사인인 프롭", this.props);

    if (isLogIn) {
      alert("로그인 완료");
      return <Redirect to={`/${userId}/main`} />;
    } else {
      return (
        <div style={{ backgroundColor: "beige", padding: 30, width: "60%" }}>
          <h2>SignIn</h2>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <MdEmail />
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="addon-wrapping"
              onChange={e => this.writeEmail(e)}
            />
          </div>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <FaLock />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="addon-wrapping"
              onChange={e => this.writePassword(e)}
            />
          </div>
          <a href="http://localhost:8000/auth/google">
            <button type="button" className="btn btn-secondary">
              <FaGoogle />
              <span> LogIn with Google</span>
            </button>
          </a>
          <button
            type="button"
            className="btn btn-primary btn btn-block"
            onClick={this.submitSignIn}
          >
            Log In
          </button>
        </div>
      );
    }
  }
}

export default SignIn;
