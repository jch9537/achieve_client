import React from "react";

import SignOut from "../components/sign/signout";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h2>Header</h2>
      <div>
        <NavLink to="/main">Home</NavLink>
      </div>
      <div>
        <NavLink to="/setting">Setting</NavLink>
      </div>
      <SignOut />
    </div>
  );
};

export default Header;
