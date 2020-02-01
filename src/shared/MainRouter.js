import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import api from "../api";
import Header from "../header/Header";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      // userId: this.props.match.params.userId

      newName: "",
      newPassword: "",
      passwordCheck: "",
      isConfirmPassword: false,
      // isMatchPassword: false
      isDeleteUser: false
    };
  }

  //이름변경
  changeName = e => {
    // console.log("이름수정", e.target.value);
    let __newName = e.target.value;
    this.setState({ newName: __newName });
  };
  //이름중복확인 :api하나더 만들어야하나? -> 나중에 만들기
  // checkSameName = () => {
  //   if(!this.state.name){
  //     alert('변경할 이름을 적어주세요')
  //   }
  // }

  //비밀번호 변경
  changePassword = e => {
    // console.log("이름수정", e.target.value);
    let __newPassword = e.target.value;
    this.setState({ newPassword: __newPassword });
  };
  //비밀번호 재확인
  repeatPassword = e => {
    // console.log("이름수정", e.target.value);
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
      newName,
      newPassword,
      passwordCheck,
      isConfirmPassword
      // isMatchPassword
    } = this.state;

    if (!(newName || newPassword || passwordCheck)) {
      alert("변경할 내용을 입력해 주세요");
    } else if (newPassword !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      this.setState({ newPassword: "", passwordCheck: "" });
    } else {
      let body = {
        id: this.props.match.params.userId,
        newName: newName,
        newPassword: newPassword
      };
      // console.log("세팅바디", body);
      api("/user", "PUT", body)
        .then(res => {
          if (res.changeInfo) {
            this.setState({ userInfo: res.changeInfo });
          }
          alert(res.message);
          this.setState({
            newName: "",
            newPassword: "",
            passwordCheck: "",
            isConfirmPassword: !isConfirmPassword
          });
        })
        .catch(err => {
          console.log(err);
          alert(err.message);
          this.setState({
            newName: "",
            newPassword: "",
            passwordCheck: "",
            isConfirmPassword: !isConfirmPassword
          });
        });
    }
  };

  deleteUser = () => {
    let body = {
      userId: this.state.userInfo.id
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

  componentDidMount() {
    api("/user", "GET")
      .then(res => {
        // console.log("사용자정보", res);
        this.setState({ userInfo: res.userInfo });
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      userInfo,
      newName,
      newPassword,
      passwordCheck,
      isConfirmPassword,
      isDeleteUser
    } = this.state;
    console.log("메인라우터 프롭스", this.props);
    console.log("메인라우터 스테이트", this.state);
    if (!userInfo) {
      return null;
    } else {
      return (
        <div>
          <Header userInfo={userInfo} {...this.props} />
          <Switch>
            <Route
              path="/:userId/main"
              render={props => <Main userId={userInfo.id} {...props} />}
            />
            <Route
              path="/board/:board_id/:board_name"
              render={props => <Board userId={userInfo.id} {...props} />}
            />
            <Route
              path="/:userId/setting"
              render={props => (
                <Setting
                  userInfo={userInfo}
                  newName={newName}
                  newPassword={newPassword}
                  passwordCheck={passwordCheck}
                  isConfirmPassword={isConfirmPassword}
                  isDeleteUser={isDeleteUser}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  repeatPassword={this.repeatPassword}
                  checkChangePassword={this.checkChangePassword}
                  matchPassword={this.matchPassword}
                  submitInfo={this.submitInfo}
                  deleteUser={this.deleteUser}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default MainRouter;
