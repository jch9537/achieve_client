import React, { Component } from "react";

import api from "../api";
import Todo from "../components/todo/todo";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null,
      changeBoard: "",
      isCheckChangeBoard: false,
      todos: null,
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
        <div style={{ backgroundColor: "green", padding: 2 }}>
          <div>
            {isCheckChangeBoard ? (
              <input
                onChange={e => this.changeBoardName(e)}
                onKeyUp={this.submitChangeBoard}
                placeholder="Chage Board Name"
              ></input>
            ) : (
              <div>
                <span style={{ fontSize: 25 }} onClick={this.isChangeBoardName}>
                  {board ? (
                    <b>{board.board_name}</b>
                  ) : (
                    <p>{this.props.match.params.board_name}</p>
                  )}
                </span>
                <span onClick={this.isChangeBoardName}>수정</span>
              </div>
            )}
          </div>
          <div>
            {isCheckCreateTodo ? (
              <input
                onKeyUp={this.submitNewTodo}
                onChange={e => this.createTodo(e)}
                placeholder="Create Todo"
              ></input>
            ) : (
              <div onClick={this.isCreateTodo}>+ todo생성</div>
            )}
          </div>
          <div>
            {todos
              ? todos.map(todo => (
                  <Todo
                    key={`${todo.id}`}
                    todo={todo}
                    deleteTodo={this.deleteTodo}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}
export default Board;
