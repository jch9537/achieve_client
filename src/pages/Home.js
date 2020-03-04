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
      <div style={{ backgroundColor: "pink" }}>
        <div>
          <div className="jumbotron">
            <h1 className="display-5">ACHIEVEMENT</h1>
            <p className="lead">
              Write down, do, and accomplish my work simply every day.
            </p>
            <hr className="my-4" />
            <p style={{ marginTop: 30 }}>
              시작은 시작일뿐이다
              <br />
              늦었다고 생각할 때가 진짜 늦었다
              <br />
              어려운길은 길이 아니다
              <br />
              내일도 할 수 있는 일을 굳이 오늘 할 필요없다
              <br />
            </p>
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="button"
              onClick={this.toggleSignInOrUp}
              disabled={this.state.signInOrUp ? null : "disabled"}
            >
              Go! SignUp
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-toggle="button"
              onClick={this.toggleSignInOrUp}
              disabled={!this.state.signInOrUp ? null : "disabled"}
            >
              Go! SignIn
            </button>
          </div>
        </div>
        {this.state.signInOrUp ? <SignIn /> : <SignUp />}
      </div>
    );
  }
}

export default Home;
