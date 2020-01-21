import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";

// import SignOut from "../components/sign/signout";
// import SignIn from "../components/sign/signin";
// import SignUp from "../components/sign/signup";
// import MainRouter from "./MainRouter";

function App() {
  return (
    <div style={{ backgroundColor: "lightgrey", padding: 10 }}>
      <Switch>
        <Route path="/setting/:user_id" component={Setting} />
        <Route path="/main/:user_id" component={Main} />
        <Route path="/board/:board_id" component={Board} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Home} />
      </Switch>

      {/* 
      <Route
        path="/home/signin"
        component={Home}
        // render={props => <Home sign={true} {...props} />}
      /> */}
      {/* <Route
        path="/home/signup"
        component={Home}
        // render={props => <Home sign={false} {...props} />}
      /> */}
      {/* <Route path="/signout" component={SignOut} /> */}
    </div>
  );
}

export default App;
