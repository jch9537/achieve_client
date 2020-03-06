import React, { Component } from "react";
import { FaRegTrashAlt, FaTrashAlt, FaTrash, FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import api from "../util/api";
import Todo from "../components/todo/todo";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      changeBoard: "",
      isCheckChangeBoard: false,
      todos: [],
      newTodo: "",
      isCheckCreateTodo: false
    };
  }

  isChangeBoardName = () => {
    this.setState({ isCheckChangeBoard: !this.state.isCheckChangeBoard });
  };

  changeBoardName = e => {
    // console.log("새보드이름", e.target.value);
    let __changeBoard = e.target.value;
    this.setState({ changeBoard: __changeBoard });
  };

  submitChangeBoard = () => {
    const { changeBoard, isCheckChangeBoard } = this.state;

    if (!changeBoard) {
      // alert("수정할 board의 이름을 적어주세요");
      this.setState({ isCheckChangeBoard: !isCheckChangeBoard });
    } else {
      let body = {
        board_id: this.props.match.params.board_id,
        changeBoard: changeBoard
      };
      api("/boards", "PUT", body)
        .then(res => {
          console.log(res);
          this.setState({
            board: res.board,
            changeBoard: "",
            isCheckChangeBoard: !isCheckChangeBoard
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  submitEnterChangeBoard = () => {
    const { changeBoard, isCheckChangeBoard } = this.state;

    if (!changeBoard) {
      // alert("수정할 board의 이름을 적어주세요");
      this.setState({ isCheckChangeBoard: !isCheckChangeBoard });
    } else {
      let body = {
        board_id: this.props.match.params.board_id,
        changeBoard: changeBoard
      };
      if (window.event.keyCode === 13) {
        api("/boards", "PUT", body)
          .then(res => {
            console.log(res);
            this.setState({
              board: res.board,
              changeBoard: "",
              isCheckChangeBoard: !isCheckChangeBoard
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  isCreateTodo = () => {
    this.setState({ isCheckCreateTodo: !this.state.isCheckCreateTodo });
  };

  createTodo = e => {
    let __newTodo = e.target.value;
    this.setState({ newTodo: __newTodo });
  };

  submitNewTodo = () => {
    const { newTodo, isCheckCreateTodo } = this.state;

    if (!newTodo) {
      // alert("생성할 todo의 이름을 적어주세요");
      this.setState({ isCheckCreateTodo: !isCheckCreateTodo });
    } else {
      let body = {
        board_id: Number(this.props.match.params.board_id),
        newTodo: newTodo
      };
      api("/todos", "POST", body)
        .then(res => {
          // console.log("투두포스트 응답", res);
          this.setState({
            todos: res.todos,
            newTodo: "",
            isCheckCreateTodo: !isCheckCreateTodo
          });
        })
        .catch(err => console.log(err));
    }
  };

  submitEnterNewTodo = () => {
    const { newTodo, isCheckCreateTodo } = this.state;

    if (!newTodo) {
      // alert("생성할 todo의 이름을 적어주세요");
      this.setState({ isCheckCreateTodo: !isCheckCreateTodo });
    } else {
      if (window.event.keyCode === 13) {
        let body = {
          board_id: Number(this.props.match.params.board_id),
          newTodo: newTodo
        };
        api("/todos", "POST", body)
          .then(res => {
            // console.log("투두포스트 응답", res);
            this.setState({
              todos: res.todos,
              newTodo: "",
              isCheckCreateTodo: !isCheckCreateTodo
            });
          })
          .catch(err => console.log(err));
      }
    }
  };

  deleteTodo = todoId => {
    let body = {
      board_id: Number(this.props.match.params.board_id),
      todo_id: todoId
    };
    api("/todos", "DELETE", body)
      .then(res => {
        console.log("투두딜리트", res);
        this.setState({ todos: res.todos });
      })
      .catch(err => alert(err.message));
  };

  componentDidMount() {
    api(`/boards/${this.props.match.params.board_id}`, "GET")
      .then(res => {
        console.log("보드응답", res);
        this.setState({ board: res.board });
      })
      .catch(err => console.log(err));
    api(`/todos/${this.props.match.params.board_id}`, "GET")
      .then(res => {
        console.log("투두 응답", res);
        this.setState({ todos: res.todos });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { board, isCheckChangeBoard, todos, isCheckCreateTodo } = this.state;
    console.log("보드스테이트", this.state);
    console.log("보드프롭", this.props);

    return (
      <div>
        <div style={{ backgroundColor: "#a1c3e2", padding: 20 }}>
          <div>
            {isCheckChangeBoard ? (
              <div className="input-group mb-3" style={{ width: "30%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Chage Board Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  onChange={e => this.changeBoardName(e)}
                  onKeyUp={this.submitEnterChangeBoard}
                  style={{ border: "white" }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-dark"
                    type="button"
                    id="button-addon1"
                    onClick={this.submitChangeBoard}
                  >
                    <FaRegEdit />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: 25 }} onClick={this.isChangeBoardName}>
                  {board ? (
                    <b>{board.board_name}</b>
                  ) : (
                    <b>{this.props.match.params.board_name}</b>
                  )}
                </span>
                <span onClick={this.isChangeBoardName}>
                  <FaRegEdit />
                </span>
              </div>
            )}
          </div>
          <div
            className="jumbotron"
            style={{ backgroundColor: "beige", padding: 10 }}
          >
            <div>
              {isCheckCreateTodo ? (
                <div className="input-group mb-3" style={{ width: "30%" }}>
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      id="button-addon1"
                      onClick={this.submitNewTodo}
                    >
                      <IoMdAdd />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Create Todo"
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    onKeyUp={this.submitEnterNewTodo}
                    onChange={e => this.createTodo(e)}
                    style={{ border: "white" }}
                  />
                </div>
              ) : (
                <div onClick={this.isCreateTodo}>+ todo생성</div>
              )}
            </div>

            <div className="container">
              <div className="row">
                {!todos.length
                  ? null
                  : todos.map(todo => (
                      <Todo
                        key={`${todo.id}`}
                        todo={todo}
                        deleteTodo={this.deleteTodo}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Board;
