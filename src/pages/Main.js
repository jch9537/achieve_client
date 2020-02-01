import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../api";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      newBoard: ""
    };
  }

  createBoard = e => {
    let __newBoard = e.target.value;
    this.setState({ newBoard: __newBoard });
  };

  enterSubmitNewBoard = () => {
    const { newBoard } = this.state;

    if (!newBoard) {
      // alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      if (window.event.keyCode === 13) {
        let body = {
          newBoard: newBoard
        };
        api("/boards", "POST", body)
          .then(res => {
            console.log(res);
            this.setState({ boards: res.boards, newBoard: "" });
          })
          .catch(err => console.log(err));
      }
    }
  };

  clickSubmitNewBoard = () => {
    const { newBoard } = this.state;

    if (!newBoard) {
      // alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      let body = {
        newBoard: newBoard
      };
      api("/boards", "POST", body)
        .then(res => {
          console.log(res);
          this.setState({ boards: res.boards, newBoard: "" });
        })
        .catch(err => console.log(err));
    }
  };

  deleteBoard = boardId => {
    // console.log(board);
    let body = {
      board_id: boardId
    };
    console.log("삭제보드바디", boardId);
    api("/boards", "DELETE", body)
      .then(res => {
        // console.log("삭제응답", res);
        this.setState({ boards: res.boards });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    api("/boards", "GET")
      .then(res => {
        this.setState({ boards: res.boards });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { boards, newBoard } = this.state;
    console.log("메인스테이트", this.state);
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
            {!boards.length
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
