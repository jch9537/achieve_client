import React, { Component } from "react";

import api from "../api";
import Header from "../header/Header";
import Todos from "../components/todo/todos";
//보드에서 이름을 수정하면 메인에서도 이름이 바껴야하므로 main에서 state관리
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ["todo", "doing", "done"],
      board: this.props.match.params.board_id,
      changeBoard: "",
      isCheckChangeBoard: true,
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
      alert("수정할 board의 이름을 적어주세요");
      this.setState({ isCheckChangeBoard: !isCheckChangeBoard });
    } else {
      let body = {
        changeBoard: changeBoard
      };
      if (window.event.keyCode === 13) {
        api("/boards", "PUT", body).then(res => {
          console.log(res);
          this.setState({
            board: res.changeBoard,
            changeBoard: "",
            isCheckChangeBoard: !isCheckChangeBoard
          });
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
    const { newTodo, isCheckCreateTodo, todos } = this.state;

    if (!newTodo) {
      alert("생성할 todo의 이름을 적어주세요");
      this.setState({ isCheckCreateTodo: !isCheckCreateTodo });
    } else {
      if (window.event.keyCode === 13) {
        let __newTodos = todos.slice();
        let __newTodo = newTodo;
        __newTodos.push(__newTodo);
        this.setState({
          todos: __newTodos,
          isCheckCreateTodo: !isCheckCreateTodo,
          newTodo: ""
        });
        //위에껀 서버완성 후 삭제
        let body = {
          newTodo: newTodo
        };
        api("/todos", "POST", body).then(res => {
          console.log(res);
          // this.setState({todos: res.body.전체todos})  서버완성 후 수정
        });
      }
    }
  };

  componentDidMount() {
    api("/boards", "GET").then(res => console.log(res));
  }

  render() {
    const { board, isCheckChangeBoard, todos, isCheckCreateTodo } = this.state;
    console.log("보드스테이트", this.state);
    console.log("보드프롭", this.props);

    return (
      <div>
        <div>
          <Header back={this.props} />
        </div>
        <div style={{ backgroundColor: "green", padding: 2 }}>
          <div>
            {isCheckChangeBoard ? (
              <div>
                <span style={{ fontSize: 25 }} onClick={this.isChangeBoardName}>
                  <b>{board}</b>
                </span>
                <span onClick={this.isChangeBoardName}>수정</span>
              </div>
            ) : (
              <input
                onChange={e => this.changeBoardName(e)}
                onKeyUp={this.submitChangeBoard}
                placeholder="Chage Board Name"
              ></input>
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
            {todos.map(todo => (
              <Todos key={todo} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Board;
