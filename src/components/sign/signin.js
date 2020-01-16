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
    console.log("email", e.target.value);
    let email = e.target.value;
    this.setState({ email: email });
  };

  passwordCheck = e => {
    console.log("password", e.target.value);
    let password = e.target.value;
    this.setState({ password: password });
  };

  submitSignIn = () => {
    console.log(this.state);
    let body = {
      email: this.state.email,
      password: this.state.password
    };
    api("user/Signin", "POST", body).then(data => {
      if (data.message === "로그인완료") {
        this.setState({ isLogIn: !this.state.isLogIn });
        console.log("체크", this.state);
      }
    });
  };

  render() {
    console.log("사인인 스테이트", this.state);
    if (this.state.isLogIn) {
      return <Redirect to={`/main/${this.state.email}`} />;
    } else {
      //만약에 결과가 맞으면 this.props.history.push(/Main)
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
