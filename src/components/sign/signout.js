import React from "react";
import { Redirect } from "react-router-dom";

const SignOut = props => {
  const { completeSignout, implementSignOut } = props;

  if (completeSignout) {
    return <Redirect to="/" />;
  } else {
    return (
      <React.Fragment>
        <span onClick={implementSignOut} style={{ color: "#3d83fa" }}>
          Log Out
        </span>
      </React.Fragment>
    );
  }
};

export default SignOut;
