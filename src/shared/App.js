import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Main from "../pages/Main";
import Board from "../pages/Board";
import SignIn from "../components/sign/signin";
import SignUp from "../components/sign/signup";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/:user_id/main" component={Main} />
        <Route path="/board/:board_id" component={Board} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
