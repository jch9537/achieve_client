import React, { Component } from "react";

import api from "../../api";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogIn: false
    };
  }

  emailCheck = e => {
    // console.log("로그인 이메일: ", e.target.value);
    let __email = e.target.value;
    this.setState({ email: __email });
  };

  passwordCheck = e => {
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
        console.log("체크", this.state);
      }
    });
  };

  render() {
    const { isLogIn, email } = this.state;
    console.log("사인인 스테이트", this.state);
    console.log("사인인 프롭", this.props);

    if (isLogIn) {
      alert("로그인 완료");
      return <Redirect to={`/main/${email}`} />;
      //만약에 결과가 맞으면 this.props.history.push(/Main)
    } else {
      return (
        <div style={{ backgroundColor: "beige", padding: 10 }}>
          <h2>SignIn</h2>
          <input
            type="email"
            placeholder="email"
            onChange={e => this.emailCheck(e)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={e => this.passwordCheck(e)}
          />
          <button onClick={this.submitSignIn}>SignIn</button>
        </div>
      );
    }
  }
}

export default SignIn;
