import React, { Component } from "react";
import {
  FaUserCircle,
  FaLock,
  FaCheckDouble,
  FaUserCheck,
  FaGoogle,
  FaAngleDoubleRight,
  FaArrowRight
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
  //유효한 Email 확인 후 렌더
  renderDuplicatedEmail = () => {
    if (this.state.email) {
      if (this.state.isValidEmail) {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#fff",
                backgroundColor: "#28a745",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              사용가능한 Email입니다. Email 중복확인
              <FaAngleDoubleRight style={{ marginLeft: 5 }} />
            </span>
          </div>
        );
      } else {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#212529",
                backgroundColor: "#ffc107",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              유효하지 않은 Email입니다.
            </span>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  createPassword = e => {
    // console.log("사인업 비밀번호: ", e.target.value);
    let __password = e.target.value;
    if (!isPassword(__password)) {
    }
    this.setState({ password: __password });
    this.checkValidPassword();
  };
  //비밀번호 유효성확인
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
  //비밀번호 유효성 여부 렌더
  renderValidPassword = () => {
    if (this.state.password) {
      if (this.state.isValidPassword) {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#fff",
                backgroundColor: "#28a745",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              사용가능한 password입니다
            </span>
          </div>
        );
      } else {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#212529",
                backgroundColor: "#ffc107",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              8~12자의 영문/숫자 조합을 사용해주세요
            </span>
          </div>
        );
      }
    } else {
      return null;
    }
  };

  // 비번확인 함수만들기
  repeatPassword = e => {
    if (this.state.password) {
      if (this.state.isValidPassword) {
        let __passwordCheck = e.target.value;
        this.setState({ passwordCheck: __passwordCheck });
        this.checkMatchPassword();
      } else {
        alert("작성한 비밀번호가 유효하지 않습니다.");
        this.setState({ password: "", passwordCheck: "" });
      }
    } else {
      alert("비밀번호 입력 후 작성해주세요");
      this.setState({ passwordCheck: "" });
    }
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

  renderMatchPassword = () => {
    if (this.state.passwordCheck) {
      if (this.state.isMatchPassword) {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#fff",
                backgroundColor: "#28a745",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              비밀번호 확인완료
            </span>
          </div>
        );
      } else {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#212529",
                backgroundColor: "#ffc107",
                borderColor: "#ced4d",
                borderRadius: 0
              }}
            >
              비밀번호가 일치하지 않습니다.
            </span>
          </div>
        );
      }
    } else {
      return null;
    }
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
    const { email, password, passwordCheck } = this.state;
    console.log("사인업 스테이트", this.state);
    // console.log("사인업 프롭", this.props);

    return (
      <div style={{ backgroundColor: "beige", padding: 30, width: "60%" }}>
        <h2>SignUp</h2>
        <div id="signup-input-container" style={{ marginBottom: "15" }}>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <FaUserCircle />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={e => this.createName(e)}
            />
          </div>

          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <MdEmail />
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Email"
              aria-label="Email"
              aria-describedby="button-addon2"
              onChange={e => this.createEmail(e)}
            />
            <div className="input-group-append">
              {this.renderDuplicatedEmail()}
              <button
                className="btn btn-secondary"
                type="button"
                id="button-addon4"
                onClick={this.checkDuplicateEmail}
                style={{ borderColor: "#ced4d" }}
              >
                <FaUserCheck
                  size="22"
                  color="white"
                  style={{ marginRight: "10" }}
                />
                Check Duplicate
              </button>
            </div>
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
              value={password}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="addon-wrapping"
              onChange={e => this.createPassword(e)}
            />
            {this.renderValidPassword()}
          </div>

          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <FaCheckDouble />
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              value={passwordCheck}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="addon-wrapping"
              onChange={e => this.repeatPassword(e)}
            />
            {this.renderMatchPassword()}
          </div>
          <a href="http://localhost:8000/auth/google">
            <button type="button" className="btn btn-secondary">
              <FaGoogle />
              <span> SignUp with Google</span>
            </button>
          </a>
        </div>

        <button
          type="button"
          className="btn btn-primary btn btn-block"
          onClick={this.submitSignUp}
        >
          Sign Up
        </button>
      </div>
    );
  }
}

export default SignUp;
