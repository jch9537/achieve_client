import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaTrashAlt, FaTrash, FaRegEdit } from "react-icons/fa";
// import { MdCreateNewFolder, MdCreate } from "react-icons/md";
// import { IoMdAdd } from "react-icons/io";

import api from "../util/api";
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
        <div
          style={{
            backgroundColor: "#ddceed",
            padding: 30,
            paddingTop: 50,
            paddingBottom: 50
          }}
        >
          <div className="input-group mb-3" style={{ width: "30%" }}>
            <input
              type="text"
              value={newBoard}
              className="form-control"
              placeholder="Create New Board"
              aria-label="Create New Board"
              aria-describedby="button-addon1"
              onChange={e => this.createBoard(e)}
              onKeyUp={this.enterSubmitNewBoard}
              style={{ border: "white" }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon1"
                onClick={this.clickSubmitNewBoard}
              >
                <FaRegEdit />
              </button>
            </div>
          </div>
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                {!boards.length
                  ? null
                  : boards.map(board => (
                      <div
                        className="col-md"
                        key={`${board.board_name}${board.id}`}
                        style={{
                          textAlign: "center",
                          margin: "auto"
                        }}
                      >
                        <div
                          style={{
                            display: "inline-block",
                            margin: "1em"
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "lightgrey",
                              borderRadius: 5,
                              width: 100,
                              height: 80,
                              padding: "1em"
                            }}
                          >
                            <Link to={`/board/${board.id}/${board.board_name}`}>
                              {board.board_name}
                            </Link>
                          </span>
                          <FaRegTrashAlt
                            onClick={() => this.deleteBoard(board.id)}
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
