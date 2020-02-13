import React, { Component } from "react";

import api from "../../util/api";
import { isEmail, isPassword } from "../../util/check";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isValidEmail: null,
      isValidPassword: null,
      isMatchPassword: null
    };
  }
  createName = e => {
    // console.log("사인업 이름: ", e.target.value);
    let __name = e.target.value;
    this.setState({ name: __name });
  };
  createEmail = e => {
    // console.log("사인업 이메일: ", e.target.value);
    const __email = e.target.value;
    this.setState({ email: __email });
    this.checkValidEmail();
  };

  checkValidEmail = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isEmail(this.state.email)) {
        this.setState({ isValidEmail: false });
      } else {
        this.setState({ isValidEmail: true });
      }
    }, 500);
  };
  // 서버에 아이디 중복확인 요청
  checkDuplicateEmail = () => {
    const { email, isValidEmail } = this.state;
    if (isValidEmail) {
      let body = {
        email: email
      };
      console.log("바디", body);
      api("/user/checkEmail", "POST", body)
        .then(res => alert(res.message))
        .catch(err => {
          if (err.status === 409) {
            alert(err.message);
            this.setState({
              email: "",
              isValidEmail: !isValidEmail
            });
          } else {
            console.log(err.message);
          }
        });
    }
  };

  createPassword = e => {
    // console.log("사인업 비밀번호: ", e.target.value);
    let __password = e.target.value;
    if (!isEmail(__password)) {
    }
    this.setState({ password: __password });
    this.checkValidPassword();
  };

  checkValidPassword = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isPassword(this.state.password)) {
        this.setState({ isValidPassword: false });
      } else {
        this.setState({ isValidPassword: true });
      }
    }, 500);
  };

  // 비번확인 함수만들기
  repeatPassword = e => {
    let __passwordCheck = e.target.value;
    this.setState({ passwordCheck: __passwordCheck });
    this.checkMatchPassword();
  };

  checkMatchPassword = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (this.state.password === this.state.passwordCheck) {
        this.setState({ isMatchPassword: true });
      } else {
        this.setState({ isMatchPassword: false });
      }
    }, 500);
  };

  submitSignUp = () => {
    const { name, email, password, passwordCheck } = this.state;
    if (!(name && email && password && passwordCheck)) {
      alert("가입정보를 모두 입력해주세요.");
    } else if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      this.setState({ password: "", passwordCheck: "" });
    } else {
      let body = {
        name: name,
        email: email,
        password: password
      };
      api("/user/signup", "POST", body)
        .then(res => {
          alert(res.message);
          this.props.handleToggle();
        })
        .catch(err => {
          alert(err.message);
          this.setState({ email: "" });
        });
    }
  };

  render() {
    const {
      email,
      isValidEmail,
      password,
      isValidPassword,
      passwordCheck,
      isMatchPassword
    } = this.state;
    console.log("사인업 스테이트", this.state);
    // console.log("사인업 프롭", this.props);

    return (
      <div style={{ backgroundColor: "beige", padding: 10 }}>
        <h2>SignUp</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={e => this.createName(e)}
            autoFocus
          />
        </div>
        <div>
          <input
            value={email}
            type="email"
            placeholder="Email"
            onChange={e => this.createEmail(e)}
          />
          <button onClick={this.checkDuplicateEmail}>중복확인</button>
          {email ? (
            isValidEmail ? (
              <span style={{ color: "blue" }}>사용가능한 email입니다.</span>
            ) : (
              <span style={{ color: "red" }}>유효하지 않은 email입니다.</span>
            )
          ) : null}
        </div>
        <div>
          <input
            value={password}
            type="password"
            placeholder="Password"
            onChange={e => this.createPassword(e)}
          />
          {password ? (
            isValidPassword ? (
              <span style={{ color: "blue" }}>사용가능한 password입니다.</span>
            ) : (
              <span style={{ color: "red" }}>
                8~10자의 영문/숫자 조합을 사용해주세요
              </span>
            )
          ) : null}
        </div>
        <div>
          <input
            value={passwordCheck}
            type="password"
            placeholder="Check Password"
            onChange={e => this.repeatPassword(e)}
          />
          {passwordCheck ? (
            isMatchPassword ? (
              <span style={{ color: "blue" }}>비밀번호 확인완료</span>
            ) : (
              <span style={{ color: "red" }}>
                비밀번호가 일치하지 않습니다.
              </span>
            )
          ) : null}
        </div>

        <button onClick={this.submitSignUp}>SignUp</button>
      </div>
    );
  }
}

export default SignUp;
