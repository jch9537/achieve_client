import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "../header/Header";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId
    };
  }
  render() {
    console.log("메인라우터 프롭스", this.props);
    console.log("메인라우터 스테이트", this.state);
    return (
      <div>
        <Header userId={this.state.userId} {...this.props} />
        <Switch>
          <Route
            path="/:userId/main"
            render={props => <Main userId={this.state.userId} {...props} />}
          />
          <Route
            path="/:userId/setting"
            render={props => <Setting userId={this.state.userId} {...props} />}
          />
          <Route
            path="/board/:board_id/:board_name"
            render={props => <Board userId={this.state.userId} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
