import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "../api";
import Home from "../pages/Home";

// 비밀번호 재확인 시 debounce를 써서 메세지 표시(확인버튼 지우기)
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newPassword: "",
      passwordCheck: "",
      isConfirmPassword: false,
      // isMatchPassword: false
      isDeleteUser: false
    };
  }
  //이름변경
  changeName = e => {
    console.log("이름수정", e.target.value);
    let __name = e.target.value;
    this.setState({ name: __name });
  };
  //이름중복확인 :api하나더 만들어야하나? -> 나중에 만들기
  // checkSameName = () => {
  //   if(!this.state.name){
  //     alert('변경할 이름을 적어주세요')
  //   }
  // }

  //비밀번호 변경
  changePassword = e => {
    console.log("이름수정", e.target.value);
    let __newPassword = e.target.value;
    this.setState({ newPassword: __newPassword });
  };
  //비밀번호 재확인
  repeatPassword = e => {
    console.log("이름수정", e.target.value);
    let __passwordCheck = e.target.value;
    this.setState({ passwordCheck: __passwordCheck });
  };
  // 비밀번호 변경여부 확인
  checkChangePassword = () => {
    const { newPassword, passwordCheck, isConfirmPassword } = this.state;

    if (newPassword && passwordCheck) {
      this.setState({ isConfirmPassword: !isConfirmPassword });
    } else {
      alert("변경할 비밀번호를 입력해주세요");
    }
  };
  // 비밀번호 일치여부 확인
  matchPassword = () => {
    const { newPassword, passwordCheck } = this.state;

    if (newPassword === passwordCheck) {
      return <span>비밀번호가 일치합니다.</span>;
    } else {
      return <span>비밀번호가 일치하지 않습니다.</span>;
    }
  };
  // 변경정보 서버로 보냄
  submitInfo = () => {
    const {
      name,
      newPassword,
      passwordCheck,
      isConfirmPassword
      // isMatchPassword
    } = this.state;

    if (!(name || newPassword || passwordCheck)) {
      alert("변경할 내용을 입력해 주세요");
    } else if (newPassword !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      this.setState({ newPassword: "", passwordCheck: "" });
    } else {
      let body = {
        userId: this.props.match.params.userId,
        name: name,
        password: newPassword
      };
      console.log("세팅바디", body);
      api("/user", "PUT", body)
        .then(res => {
          alert(res.message);
          this.setState({
            name: "",
            newPassword: "",
            passwordCheck: "",
            isConfirmPassword: !isConfirmPassword
          });
        })
        .catch(err => {
          console.log(err);
          alert(err.message);
          this.setState({
            name: "",
            newPassword: "",
            passwordCheck: "",
            isConfirmPassword: !isConfirmPassword
          });
        });
    }
  };

  deleteUser = () => {
    let body = {
      userId: this.props.userId
    };
    api("/user", "DELETE", body)
      .then(res => {
        console.log("회원탈퇴 응답", res);
        alert(res.message);
        this.setState({ isDeleteUser: !this.state.isDeleteUser });
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  };

  render() {
    const {
      name,
      newPassword,
      passwordCheck,
      isConfirmPassword,
      isDeleteUser
    } = this.state;
    // console.log("세팅스테이트", this.state);
    console.log("세팅프롭", this.props);
    if (isDeleteUser) {
      return <Redirect to="/" component={Home} />;
    } else {
      return (
        <div>
          <div style={{ backgroundColor: "#64a4dd", padding: 10 }}>
            <span style={{ fontSize: 30 }}>
              <b> Setting </b>
            </span>
            <button onClick={this.deleteUser}>회원탈퇴</button>
            <div>
              {/* 내용을 api로보내고 중복이있으면 옆에 메세지를 보낸 후 내용을 빈공간처리 */}
              <input
                value={name}
                onChange={e => this.changeName(e)}
                type="text"
                placeholder="Change Name"
              />
              {/* <button>중복확인</button> 나중에 만들기 */}
            </div>
            <div>
              <input
                value={newPassword}
                onChange={e => this.changePassword(e)}
                type="password"
                placeholder="Change Password"
              />
            </div>
            <div>
              <input
                value={passwordCheck}
                onChange={e => this.repeatPassword(e)}
                type="password"
                placeholder="Check Change Password"
              />
              <button onClick={this.checkChangePassword}>확인</button>
              {isConfirmPassword && newPassword && passwordCheck
                ? this.matchPassword()
                : null}
            </div>
            <button onClick={this.submitInfo}>회원정보수정</button>
          </div>
        </div>
      );
    }
  }
}

export default Setting;
