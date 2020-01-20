import React, { Component } from "react";

import api from "../api";
import Header from "../header/Header";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newPassword: "",
      repeatPassword: "",
      checkRepeat: false,
      confirmPassword: false
    };
  }
  //이름변경
  changeName = e => {
    console.log("이름수정", e.target.value);
    let name = e.target.value;
    this.setState({ name: name });
  };
  //비밀번호 변경
  changePassword = e => {
    console.log("이름수정", e.target.value);
    let newPassword = e.target.value;
    this.setState({ newPassword: newPassword });
  };
  //비밀번호 재확인
  repeatPassword = e => {
    console.log("이름수정", e.target.value);
    let repeatPassword = e.target.value;
    this.setState({ repeatPassword: repeatPassword });
  };
  // 비밀번호 일치여부 확인
  checkPassword = () => {
    const { newPassword, repeatPassword, confirmPassword } = this.state;
    if (newPassword && repeatPassword) {
      if (newPassword === repeatPassword) {
        this.setState({
          checkRepeat: !this.state.checkRepeat,
          confirmPassword: !confirmPassword
        });
      }
    } else if (newPassword && !repeatPassword) {
      alert("비밀번호 재확인을 해주세요.");
    } else {
      alert("변경할 비밀번호를 입력해주세요");
    }
  };
  // 비번 일치여부따라 메세지 표시
  // renderConfirmMessage = () => {
  //   if (!this.state.confirmPassword) {
  //     return <div>비밀번호가 일치하지 않습니다.</div>;
  //   }
  // };

  submitInfo = () => {
    const { name, newPassword, repeatPassword } = this.state;
    if (!(name || newPassword || repeatPassword)) {
      alert("변경할 내용을 입력해 주세요");
    } else if (newPassword !== repeatPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      let body = {
        name: name,
        password: newPassword
      };
      api("/user", "PUT", body).then(res => {
        console.log(res);
        alert(res.message);
        this.setState({
          name: "",
          newPassword: "",
          repeatPassword: ""
        });
      });
    }
  };

  render() {
    console.log("유저프롭", this.props);
    return (
      <div>
        <div>
          <Header back={this.props} />
        </div>
        <h2>Setting</h2>
        <div>
          {/* 내용을 api로보내고 중복이있으면 옆에 메세지를 보낸 후 내용을 빈공간처리 */}
          <input
            value={this.state.name}
            onChange={e => this.changeName(e)}
            type="text"
            placeholder="바꿀 이름을 적어주세요"
          />
          <button>중복확인</button>
        </div>
        <div>
          <input
            value={this.state.password}
            onChange={e => this.changePassword(e)}
            type="password"
            placeholder="바꿀 비밀번호를 적어주세요"
          />
        </div>
        <div>
          <input
            value={this.state.name.repeatPassword}
            onChange={e => this.repeatPassword(e)}
            type="password"
            placeholder="바꿀 비밀번호 확인"
          />
          <button onClick={this.checkPassword}>확인</button>
          {this.state.checkRepeat ? (
            this.state.confirmPassword ? (
              <span>비밀번호가 일치합니다.</span>
            ) : (
              <span>비밀번호가 일치하지 않습니다.</span>
            )
          ) : null}
        </div>
        <button onClick={this.submitInfo}>회원정보수정</button>
      </div>
    );
  }
}

export default Setting;

{
  /* {this.state.repeatPassword ? (
  this.state.confirmPassword ? (
    <span>비밀번호가 일치합니다.</span>
  ) : (
    <span>비밀번호가 일치하지 않습니다.</span>
  )
) : null} */
}
