import React, { Component } from "react";

import Header from "../header/Header";

const Setting = () => {
  return (
    <div>
      <div style={{ flex: 1, backgroundColor: "orange", padding: 10 }}>
        <Header />
      </div>
      <h2>Setting</h2>
    </div>
  );
};

export default Setting;

// class Setting extends Component {
//   constructor(props) {
//     super(props);
//     // this.state = {};
//   }
//   render() {
//     return (
//       <div>
//         <h2>Setting</h2>
//       </div>
//     );
//   }
// }

// export default Setting;
