import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "pink", padding: 10 }}>
      <h2>Home</h2>
      <div>
        <Link to="/signin">SignIn</Link>
      </div>
      <div>
        <Link to="signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Home;
