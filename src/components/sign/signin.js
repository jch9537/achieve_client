import React, { Component } from "react";

import api from "../../api";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    api("user/Signin", "POST", body).then(data => console.log("된다", data));
  };

  render() {
    console.log("사인인 스테이트", this.state);
    //만약에 결과가 맞으면 this.props.history.push(/Main)
    return (
      <div>
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

export default SignIn;
