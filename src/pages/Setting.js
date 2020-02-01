import React from "react";
import { Redirect } from "react-router-dom";

import Home from "../pages/Home";

// 비밀번호 재확인 시 debounce를 써서 메세지 표시(확인버튼 지우기)

const Setting = props => {
  const {
    newName,
    newPassword,
    passwordCheck,
    isConfirmPassword,
    isDeleteUser,
    changeName,
    changePassword,
    repeatPassword,
    checkChangePassword,
    matchPassword,
    submitInfo,
    deleteUser
  } = props;
  // console.log("세팅스테이트", this.state);
  // console.log("세팅프롭", props);
  if (isDeleteUser) {
    return <Redirect to="/" component={Home} />;
  } else {
    return (
      <div>
        <div style={{ backgroundColor: "#64a4dd", padding: 10 }}>
          <span style={{ fontSize: 30 }}>
            <b> Setting </b>
          </span>
          <button onClick={deleteUser}>회원탈퇴</button>
          <div>
            {/* 내용을 api로보내고 중복이있으면 옆에 메세지를 보낸 후 내용을 빈공간처리 */}
            <input
              value={newName}
              onChange={e => changeName(e)}
              type="text"
              placeholder="Change Name"
            />
            {/* <button>중복확인</button> 나중에 만들기 */}
          </div>
          <div>
            <input
              value={newPassword}
              onChange={e => changePassword(e)}
              type="password"
              placeholder="Change Password"
            />
          </div>
          <div>
            <input
              value={passwordCheck}
              onChange={e => repeatPassword(e)}
              type="password"
              placeholder="Confirm Change Password"
            />
            <button onClick={checkChangePassword}>확인</button>
            {isConfirmPassword && newPassword && passwordCheck
              ? matchPassword()
              : null}
          </div>
          <button onClick={submitInfo}>회원정보수정</button>
        </div>
      </div>
    );
  }
};

export default Setting;
