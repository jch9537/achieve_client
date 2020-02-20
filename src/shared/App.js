import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import MainRouter from "./MainRouter";

function App(props) {
  console.log("APP프롭스", props);
  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Switch>
        <Route path="/:userId" component={MainRouter} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
