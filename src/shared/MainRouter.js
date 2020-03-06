import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import api from "../util/api";
import { isPassword } from "../util/check";
import Header from "../header/Header";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      newName: "",
      newPassword: "",
      passwordCheck: "",
      isValidPassword: null,
      isConfirmPassword: false,
      isDeleteUser: false
      //isMatchPassword: null
    };
  }
  //이름변경
  changeName = e => {
    // console.log("이름수정", e.target.value);
    let __newName = e.target.value;
    this.setState({ newName: __newName });
  };
  //비밀번호 변경
  changePassword = e => {
    // console.log("이름수정", e.target.value);
    if (this.state.userInfo.oauth_signup === 1) {
      alert("구글로그인 사용자는 비밀번호 변경이 불가합니다.");
      this.setState({ newPassword: "" });
    } else {
      let __newPassword = e.target.value;
      this.setState({ newPassword: __newPassword });
      this.checkValidPassword();
    }
  };
  //비밀번호 유효성확인
  checkValidPassword = () => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (!isPassword(this.state.newPassword)) {
        this.setState({ isValidPassword: false });
      } else {
        this.setState({ isValidPassword: true });
      }
    }, 500);
  };
  //비밀번호 렌더
  renderValidPassword = () => {
    const { newPassword, isValidPassword } = this.state;
    if (newPassword) {
      if (isValidPassword) {
        return (
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon2"
              style={{
                color: "#fff",
                backgroundColor: "#28a745",
                borderColor: "#ced4d"
              }}
            >
              사용가능한 password입니다.
            </span>
            //{" "}
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
                borderColor: "#ced4d"
              }}
            >
              8~12자의 영문/숫자 조합을 사용해주세요
            </span>
            //{" "}
          </div>
        );
      }
    } else {
      return null;
    }
  };
  //비밀번호 재확인
  repeatPassword = e => {
    // console.log("이름수정", e.target.value);
    if (!this.state.newPassword) {
      alert("변경할 비밀번호를 입력 후 비밀번호 재확인을 해주세요");
      this.setState({ passwordCheck: "" });
    } else {
      let __passwordCheck = e.target.value;
      this.setState({ passwordCheck: __passwordCheck });
    }
  };
  // 비밀번호 변경여부 확인   -------------------------필요없음
  // checkChangePassword = () => {
  //   const { newPassword, passwordCheck, isConfirmPassword } = this.state;
  //   if (newPassword && passwordCheck) {
  //     this.setState({ isConfirmPassword: !isConfirmPassword });
  //   } else {
  //     alert("변경할 비밀번호를 입력해주세요");
  //   }
  // };
  // 비밀번호 일치여부 확인
  matchPassword = () => {
    const { newPassword, passwordCheck, isValidPassword } = this.state;
    if (passwordCheck) {
      if (isValidPassword) {
        if (newPassword === passwordCheck) {
          return (
            <div className="input-group-append">
              <span
                className="input-group-text"
                id="basic-addon2"
                style={{
                  color: "#fff",
                  backgroundColor: "#28a745",
                  borderColor: "#ced4d"
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
                  borderColor: "#ced4d"
                }}
              >
                비밀번호가 일치하지 않습니다
              </span>
            </div>
          );
        }
      } else {
        alert(
          "입력하신 비밀번호가 유효하지 않습니다. 8~12자의 영문/숫자 조합을 사용해주세요"
        );
        this.setState({ newPassword: "", passwordCheck: "" });
      }
    } else {
      return null;
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
      // isValidPassword,
      // isConfirmPassword,
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
                  // isValidPassword={isValidPassword}
                  // isConfirmPassword={isConfirmPassword}
                  renderValidPassword={this.renderValidPassword}
                  isDeleteUser={isDeleteUser}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  repeatPassword={this.repeatPassword}
                  // checkChangePassword={this.checkChangePassword}
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
