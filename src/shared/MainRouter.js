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
      userId: this.props.match.params.userId
    };
  }

  componentDidMount() {
    api("/user", "GET").then(res => {
      console.log("사용자정보", res);
      this.setState({ userInfo: res.userInfo });
    });
  }

  render() {
    console.log("메인라우터 프롭스", this.props);
    console.log("메인라우터 스테이트", this.state);
    if (!this.state.userInfo) {
      return null;
    } else {
      return (
        <div>
          <Header userInfo={this.state.userInfo} {...this.props} />
          <Switch>
            <Route
              path="/:userId/main"
              render={props => (
                <Main userId={this.state.userInfo.id} {...props} />
              )}
            />
            <Route
              path="/board/:board_id/:board_name"
              render={props => (
                <Board userId={this.state.userInfo.id} {...props} />
              )}
            />
            <Route
              path="/:userId/setting"
              render={props => (
                <Setting userId={this.state.userInfo.id} {...props} />
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default MainRouter;
