import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "../../api";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    let body = {
      email: email,
      password: password
    };
    api("/user/signin", "POST", body).then(data => {
      if (data.message === "로그인완료") {
        this.setState({ isLogIn: !isLogIn });
        // console.log("체크", this.state);
      }
    });
  };

  render() {
    const { isLogIn, email } = this.state;
    // console.log("사인인 스테이트", this.state);
    // console.log("사인인 프롭", this.props);

    if (isLogIn) {
      alert("로그인 완료");
      return <Redirect to={`/main/${email}`} />;
      //만약에 결과가 맞으면 this.props.history.push(/Main)
    } else {
      return (
        <div style={{ backgroundColor: "beige", padding: 10 }}>
          <h2>SignIn</h2>

          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={e => this.writeEmail(e)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.writePassword(e)}
            />
          </div>
          <button onClick={this.submitSignIn}>로그인</button>
        </div>
      );
    }
  }
}

export default SignIn;
