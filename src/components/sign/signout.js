import React from "react";
import { Redirect } from "react-router-dom";

const SignOut = props => {
  const { completeSignout, implementSignOut } = props;

  if (completeSignout) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <button onClick={implementSignOut}>SignOut</button>
      </div>
    );
  }
};

export default SignOut;
