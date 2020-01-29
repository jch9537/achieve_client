import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../api";
// 안녕하세요 유저네임 추가

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: null,
      newBoard: ""
    };
  }
  createBoard = e => {
    let __newBoard = e.target.value;
    this.setState({ newBoard: __newBoard });
  };

  enterSubmitNewBoard = () => {
    const { newBoard, isCheckCreateBoard, boards } = this.state;

    if (!newBoard) {
      alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      if (window.event.keyCode === 13) {
        let body = {
          newBoard: newBoard
        };
        api("/boards", "POST", body).then(res => {
          console.log(res);
          this.setState({ boards: res.boards, newBoard: "" });
        });
      }
    }
  };

  clickSubmitNewBoard = () => {
    const { newBoard, isCheckCreateBoard, boards } = this.state;

    if (!newBoard) {
      alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      let body = {
        newBoard: newBoard
      };
      api("/boards", "POST", body).then(res => {
        console.log(res);
        this.setState({ boards: res.boards, newBoard: "" });
      });
    }
  };

  deleteBoard = boardId => {
    // console.log(board);
    // 해당보드네임이나 아이디를 서버로 보낸뒤에 db에서 삭제를 한 후 db에서 전체 board정보를 가져와 setState해줘 렌더
    let body = {
      boardId: boardId
    };
    console.log("삭제보드바디", boardId);
    api("/boards", "DELETE", body).then(res => {
      console.log("삭제응답", res);
      this.setState({ boards: res.boards });
    });
    //req를 삭제할 것을 보내 db에서 삭제한 후 전체boards를 가져와서 this.setState({boards: res})로 처리
  };

  componentDidMount() {
    console.log("컴포넌트 디드마운트");
    api("/boards", "GET")
      .then(res => {
        console.log("메인프롭스 보드가져오기", res);
        this.setState({ boards: res.boards });
      })
      .catch(err => {
        console.log("메인프롭스 보드가져오기 에러", err);
      });
  }

  render() {
    const { boards, newBoard } = this.state;

    console.log("메인프롭스", this.props);

    return (
      <div>
        <div style={{ backgroundColor: "#a1c3e2", padding: 10 }}>
          <h2>Main</h2>
          <div>
            <input
              type="text"
              value={newBoard}
              placeholder="Create New Board"
              onChange={e => this.createBoard(e)}
              onKeyUp={this.enterSubmitNewBoard}
            ></input>
            <span onClick={this.clickSubmitNewBoard}>Create</span>
          </div>
          <div>
            {!boards
              ? null
              : boards.map(board => (
                  <div
                    key={`${board.board_name}${board.id}`}
                    style={{
                      backgroundColor: "lightgrey",
                      width: 200,
                      margin: 10,
                      padding: 5
                    }}
                    // onClick={() => selectBoard(board.id, board.board_name)}
                  >
                    <Link to={`/board/${board.id}/${board.board_name}`}>
                      {board.board_name}
                    </Link>
                    <span onClick={() => this.deleteBoard(board.id)}>삭제</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
