import React from "react";
import { Redirect } from "react-router-dom";
import { FaUserCircle, FaLock, FaCheckDouble } from "react-icons/fa";

import Home from "../pages/Home";

// 비밀번호 재확인 시 debounce를 써서 메세지 표시(확인버튼 지우기)
const Setting = props => {
  const {
    newName,
    newPassword,
    passwordCheck,
    isDeleteUser,
    changeName,
    changePassword,
    repeatPassword,
    matchPassword,
    renderValidPassword,
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
          <div>
            <span style={{ fontSize: 30 }}>
              <b> Setting </b>
            </span>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteUser}
              style={{ border: "2px solid #ced4d" }}
            >
              Close My Account
            </button>
          </div>
          <div id="signup-input-container" style={{ marginBottom: "15" }}>
            <div className="input-group flex-nowrap">
              <div className="input-group-prepend">
                <span className="input-group-text" id="addon-wrapping">
                  <FaUserCircle />
                </span>
              </div>
              <input
                className="form-control"
                value={newName}
                type="text"
                placeholder="Change Name"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                onChange={e => changeName(e)}
              />
            </div>
          </div>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <FaLock />
              </span>
            </div>
            <input
              className="form-control"
              value={newPassword}
              type="password"
              placeholder="Change Password"
              aria-label="Password"
              aria-describedby="addon-wrapping"
              onChange={e => changePassword(e)}
            />
            {renderValidPassword()}
          </div>
          <div className="input-group flex-nowrap">
            <div className="input-group-prepend">
              <span className="input-group-text" id="addon-wrapping">
                <FaCheckDouble />
              </span>
            </div>
            <input
              className="form-control"
              value={passwordCheck}
              type="password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="addon-wrapping"
              onChange={e => repeatPassword(e)}
            />
            {matchPassword()}
          </div>
          <button
            type="button"
            className="btn btn-primary btn btn-block"
            onClick={submitInfo}
            style={{ width: "30%" }}
          >
            SAVE
          </button>
        </div>
      </div>
    );
  }
};

export default Setting;
