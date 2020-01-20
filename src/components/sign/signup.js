import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "../../api";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      completeSignUp: false
    };
  }
  nameCheck = e => {
    // console.log("사인업 이름: ", e.target.value);
    let __name = e.target.value;
    this.setState({ name: __name });
  };

  emailCheck = e => {
    // console.log("사인업 이메일: ", e.target.value);
    let __email = e.target.value;
    this.setState({ email: __email });
  };

  passwordCheck = e => {
    // console.log("사인업 비밀번호: ", e.target.value);
    let __password = e.target.value;
    this.setState({ password: __password });
  };

  submitSignUp = () => {
    const { name, email, password, completeSignUp } = this.state;

    console.log(this.state);
    let body = {
      name: name,
      email: email,
      password: password
    };
    api("/user/signup", "POST", body).then(data => {
      if (data.message === "회원가입완료") {
        //회원가입완료 말고 상태체크(status)나 다른걸로생각해보기
        this.setState({ completeSignUp: !completeSignUp });
      }
    });
  };

  render() {
    //만약에 결과가 맞으면 this.props.history.push(/Main) - 이거 안됨 확인
    const { completeSignUp } = this.state;
    // console.log("사인업 스테이트", this.state);
    // console.log("사인업 프롭", this.props);

    if (completeSignUp) {
      alert("회원가입완료");
      return <Redirect to="/signin" />;
    } else {
      return (
        <div style={{ backgroundColor: "beige", padding: 10 }}>
          <h2>SignUp</h2>
          <input
            type="text"
            placeholder="name"
            onChange={e => this.emailCheck(e)}
          />
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
          <button onClick={this.submitSignUp}>SignUp</button>
        </div>
      );
    }
  }
}

export default SignUp;
