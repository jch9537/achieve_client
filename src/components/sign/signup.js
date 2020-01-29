import React, { Component } from "react";

import api from "../../api";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isConfirmPassword: false
    };
  }
  createName = e => {
    // console.log("사인업 이름: ", e.target.value);
    let __name = e.target.value;
    this.setState({ name: __name });
  };

  createEmail = e => {
    // console.log("사인업 이메일: ", e.target.value);
    let __email = e.target.value;
    this.setState({ email: __email });
  };

  createPassword = e => {
    // console.log("사인업 비밀번호: ", e.target.value);
    let __password = e.target.value;
    this.setState({ password: __password });
  };

  // 비번확인 함수만들기
  repeatPassword = e => {
    let __passwordCheck = e.target.value;
    console.log(__passwordCheck);
    this.setState({ passwordCheck: __passwordCheck });
  };

  checkWritePassword = () => {
    if (this.state.password) {
      if (this.state.passwordCheck) {
        this.setState({ isConfirmPassword: !this.state.isConfirmPassword });
      } else {
        alert("비밀번호 확인을 해주세요");
      }
    } else {
      alert("비밀번호를 입력해주세요");
    }
  };

  matchPassword = () => {
    if (this.state.password === this.state.passwordCheck) {
      return <span>비밀번호가 일치합니다.</span>;
    } else {
      return <span>비밀번호가 일치하지 않습니다.</span>;
    }
  };

  submitSignUp = () => {
    const {
      name,
      email,
      password,
      passwordCheck,
      isConfirmPassword
    } = this.state;
    if (!(name && email && password && passwordCheck)) {
      alert("가입정보를 모두 입력해주세요.");
    } else if (!isConfirmPassword) {
      alert("확인버튼을 눌러 비밀번호 일치여부를 확인해주세요");
    } else if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
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
    const { isConfirmPassword } = this.state;
    console.log("사인업 스테이트", this.state);
    console.log("사인업 프롭", this.props);

    return (
      <div style={{ backgroundColor: "beige", padding: 10 }}>
        <h2>SignUp</h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={e => this.createName(e)}
          />
        </div>
        <div>
          <input
            value={this.state.email}
            type="email"
            placeholder="Email"
            onChange={e => this.createEmail(e)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.createPassword(e)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Check Password"
            onChange={e => this.repeatPassword(e)}
          />
          <button onClick={this.checkWritePassword}>확인</button>
          {isConfirmPassword ? this.matchPassword() : null}
        </div>

        <button onClick={this.submitSignUp}>SignUp</button>
      </div>
    );
  }
}

export default SignUp;
