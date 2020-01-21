import React, { Component } from "react";

import SignIn from "../components/sign/signin";
import SignUp from "../components/sign/signup";

class Home extends Component {
  state = {
    signInOrUp: true
  };

  toggleSignInOrUp = () => {
    this.setState({ signInOrUp: !this.state.signInOrUp });
  };

  render() {
    console.log("홈 스테이트: ", this.state);
    console.log("홈 프롭: ", this.props);
    return (
      <div style={{ backgroundColor: "pink", padding: 10 }}>
        <div>
          <div>
            <span style={{ fontSize: 30 }}>
              <b>ACHIEVEMENT</b>
            </span>
            <div style={{ backgroundColor: "coral", padding: 10, margin: 10 }}>
              <h4>- 시작은 시작일뿐이다</h4>
              <h4>- 늦었다고 생각할 때가 진짜 늦었다</h4>
              <h4>- 어려운길은 길이 아니다</h4>
              <h4>- 내일도 할 수 있는 일을 굳이 오늘 할 필요없다</h4>
            </div>
          </div>
          {this.state.signInOrUp ? (
            <div style={{ padding: 5 }}>
              가입되어 있지 않나요?
              <span
                style={{ backgroundColor: "#a6cfa0", padding: 2, margin: 5 }}
                onClick={this.toggleSignInOrUp}
              >
                Go! SignUp
              </span>
            </div>
          ) : (
            <div style={{ padding: 5 }}>
              이미 가입되어 있나요?
              <span
                style={{ backgroundColor: "#a6cfa0", padding: 2, margin: 5 }}
                onClick={this.toggleSignInOrUp}
              >
                Go! LogIn
              </span>
            </div>
          )}
        </div>
        {this.state.signInOrUp ? (
          <SignIn />
        ) : (
          <SignUp handleToggle={this.toggleSignInOrUp} />
        )}
      </div>
    );
  }
}

export default Home;
