import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";
import SignOut from "../components/sign/signout";
import SignIn from "../components/sign/signin";
import SignUp from "../components/sign/signup";
// import MainRouter from "./MainRouter";

function App() {
  return (
    <div style={{ backgroundColor: "lightgrey", padding: 10 }}>
      <Route path="/signout" component={SignOut} />
      <Route path="/setting/:user_id" component={Setting} />

      <Route path="/main/:user_id" component={Main} />
      {/* <Route path="/main" component={Main} /> */}

      <Route path="/board/:board_id" component={Board} />
      {/* <Route path="/board" component={Board} /> */}

      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
