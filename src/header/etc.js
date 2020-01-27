// ------------------App.js------------------------------
// import React from "react";
// import { Route, Switch } from "react-router-dom";

// import Home from "../pages/Home";
// import Main from "../pages/Main";
// import Board from "../pages/Board";
// import Setting from "../pages/Setting";

// // import SignOut from "../components/sign/signout";
// // import SignIn from "../components/sign/signin";
// // import SignUp from "../components/sign/signup";
// // import MainRouter from "./MainRouter";

// function App() {
//   return (
//     <div style={{ backgroundColor: "lightgrey", padding: 10 }}>
//       <Switch>
//         <Route path="/setting/:user_id" component={Setting} />
//         <Route path="/main/:user_id" component={Main} />
//         <Route path="/board/:board_id" component={Board} />
//         <Route path="/home" component={Home} />
//         <Route path="/" component={Home} />
//       </Switch>
//     </div>
//   );
// }

// export default App;

// -------------------------Main.js-----------------------------
// import React, { Component } from "react";
// import { Link } from "react-router-dom";

// import api from "../api";
// import Header from "../header/Header";

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userId: this.props.match.params.user_id, //헤더에 넘겨주는게 param이 아니고 session.user_id로 넘겨줘야함
//       boards: ["achieve", "todolist"],
//       newBoard: "",
//       isCheckCreateBoard: false
//     };
//   }

//   isCreateBoard = () => {
//     this.setState({ isCheckCreateBoard: !this.state.isCheckCreateBoard });
//   };

//   createBoard = e => {
//     let newBoard = e.target.value;
//     this.setState({ newBoard: newBoard });
//   };

//   enterSubmitNewBoard = () => {
//     const { newBoard, isCheckCreateBoard, boards } = this.state;

//     if (!newBoard) {
//       alert("생성할 board의 이름을 적어주세요");
//       this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
//     } else {
//       if (window.event.keyCode === 13) {
//         let __newBoards = boards.slice();
//         let __newBoard = newBoard;
//         __newBoards.push(__newBoard);
//         this.setState({
//           boards: __newBoards,
//           isCheckCreateBoard: !isCheckCreateBoard,
//           newBoard: ""
//         });
//         //위에껀 그냥 클라이언트표시용 아래는 서버연결하는거니까 진짜
//         let body = {
//           newBoard: newBoard
//         };
//         api("/boards", "POST", body).then(res => console.log(res));
//       }
//     }
//   };

//   clickSubmitNewBoard = () => {
//     const { newBoard, isCheckCreateBoard, boards } = this.state;

//     if (!newBoard) {
//       alert("생성할 board의 이름을 적어주세요");
//       this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
//     } else {
//       let __newBoards = boards.slice();
//       let __newBoard = newBoard;
//       __newBoards.push(__newBoard);
//       this.setState({
//         boards: __newBoards,
//         isCheckCreateBoard: !isCheckCreateBoard,
//         newBoard: ""
//       });
//       //위에껀 그냥 클라이언트표시용 아래는 서버연결하는거니까 진짜
//       let body = {
//         board_name: newBoard
//       };
//       api("/boards", "POST", body).then(res => console.log(res));
//     }
//   };

//   deleteBoard = board => {
//     // console.log(board);
//     // 해당보드네임이나 아이디를 서버로 보낸뒤에 db에서 삭제를 한 후 db에서 전체 board정보를 가져와 setState해줘 렌더
//     let body = {
//       board_name: board
//     };
//     api("/boards", "DELETE", body).then(res => console.log(res));
//     //req를 삭제할 것을 보내 db에서 삭제한 후 전체boards를 가져와서 this.setState({boards: res})로 처리
//   };

//   // moveEachBoard = e => {
//   //   this.setState({ selectBoard: e.board }); // e.board는 서버연결 후 보드아이디로 변경하기
//   // };  --> 이것도 작동함 안쓰면 지우기

//   componentDidMount() {
//     api("/boards", "GET").then(res => console.log(res)); //    /boards-> /users로 변경 session.user_id로 변경
//     //res를 this.setState({boards: res})로 처리
//   }

//   render() {
//     const { boards } = this.state;
//     console.log("메인 스테이트", this.state);
//     console.log("메인프롭스", this.props);

//     // if (this.state.selectBoard) {
//     //   return <Redirect to={`/board/${selectBoard}`} />;
//     // }  -> 안쓰면 지우기
//     return (
//       <div>
//         <div>
//           <Header user={this.state.userId} />
//         </div>
//         <div style={{ backgroundColor: "#a1c3e2", padding: 10 }}>
//           <h2>Main</h2>
//           <div>
//             <input
//               type="text"
//               value={this.state.newBoard}
//               placeholder="Create New Board"
//               onChange={e => this.createBoard(e)}
//               onKeyUp={this.enterSubmitNewBoard}
//             ></input>
//             <span onClick={this.clickSubmitNewBoard}>Create</span>
//           </div>
//           <div>
//             {boards.map(board => (
//               <div
//                 // onClick={() => this.moveEachBoard({ board })}
//                 key={board}
//                 style={{
//                   backgroundColor: "lightgrey",
//                   width: 200,
//                   margin: 10,
//                   padding: 5
//                 }}
//               >
//                 <Link to={`/board/${board}`}>{board}</Link>
//                 <span onClick={() => this.deleteBoard(board)}> 삭제</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Main;
