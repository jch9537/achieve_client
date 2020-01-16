import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import api from "../api";
import Header from "../header/Header";
//input에 엔터키 추가
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: ["achieve", "todolist"],
      newBoard: "",
      selectBoard: ""
    };
  }

  makeNewBoard = e => {
    let newBoard = e.target.value;
    this.setState({ newBoard });
  };

  pullEnterNewBoard = () => {
    if (window.event.keyCode === 13) {
      this.createBoard();
    }
  };

  createBoard = () => {
    let changeBoard = this.state.boards.slice();
    let addBoard = this.state.newBoard;
    changeBoard.push(addBoard);
    this.setState({ boards: changeBoard });
    //위에껀 그냥 클라이언트표시용 아래는 서버연결하는거니까 진짜
    let board_name = addBoard;
    api("boards", "POST", { board_name }).then(res => console.log(res));
  };

  moveEachBoard = e => {
    this.setState({ selectBoard: e.board }); // e.board는 서버연결 후 보드아이디로 변경하기
  };

  editBoard = e => {
    console.log("수정사항", e.target.value);
  };

  deleteBoard = () => {
    // 해당보드네임이나 아이디를 서버로 보낸뒤에 db에서 삭제를 한 후 db에서 전체 board정보를 가져와 setState해줘 렌더
  };

  render() {
    console.log("메인 스테이트", this.state);
    if (this.state.selectBoard) {
      return <Redirect to={`/board/${this.state.selectBoard}`} />;
    }
    return (
      <div>
        <div style={{ backgroundColor: "orange", padding: 10 }}>
          <Header />
        </div>
        <div style={{ backgroundColor: "coral", padding: 10 }}>
          <h2>Main</h2>
          <input
            type="text"
            placeholder="New Board"
            onChange={e => this.makeNewBoard(e)}
            onKeyUp={this.pullEnterNewBoard}
          ></input>
          <span onClick={this.createBoard}>Create</span>
          <div>
            {this.state.boards.map(board => (
              <div
                onClick={() => this.moveEachBoard({ board })}
                key={board}
                style={{
                  backgroundColor: "lightgrey",
                  width: 200,
                  margin: 10,
                  padding: 5
                }}
              >
                <span>{board}</span>
                <span> 삭제</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
