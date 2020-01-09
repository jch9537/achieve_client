import React, { Component } from "react";

import api from "../../api";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  nameCheck = e => {
    console.log("name", e.target.value);
    let name = e.target.value;
    this.setState({ name: name });
  };

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

  submitSignUp = () => {
    console.log(this.state);
    let body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    api("user/signup", "POST", body).then(data => console.log("된다", data));
  };

  render() {
    console.log("사인업 스테이트", this.state);
    //만약에 결과가 맞으면 this.props.history.push(/Main)
    return (
      <div>
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

export default SignUp;
