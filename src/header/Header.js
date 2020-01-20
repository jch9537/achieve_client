import React, { Component } from "react";

// import Main from "../pages/Main";
import SignOut from "../components/sign/signout";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // user_id: this.props.back.match.params.user_id
    };
  }
  goBack = () => {
    this.props.back.history.goBack();
  };
  render() {
    console.log("헤더스테이트", this.state);
    console.log("헤더프롭", this.props);
    return (
      <div style={{ backgroundColor: "orange", padding: 10 }}>
        <div>
          <h2>Header</h2>
          <div>
            <NavLink to={`/main/${this.props.back.match.params.user_id}`}>
              {/* 각컴포넌트에서 user_id를 가져오는방법고민 */}
              Home
            </NavLink>
          </div>
          <div>
            <NavLink to={`/setting/${this.props.back.match.params.user_id}`}>
              Setting
            </NavLink>
          </div>
          <SignOut />
          <button onClick={this.goBack}>뒤로가기</button>
        </div>
      </div>
    );
  }
}

export default Header;
