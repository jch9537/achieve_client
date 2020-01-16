import React, { Component } from "react";

import Header from "../header/Header";
import Todos from "../components/todo/todos";

class Board extends Component {
  state = {
    todos: ["todo", "doing", "done"],
    changeBoard: true
  };

  changeBoardName = () => {
    this.setState({ changeBoard: !this.state.changeBoard });
  };

  render() {
    return (
      <div>
        <div style={{ flex: 1, backgroundColor: "orange", padding: 10 }}>
          <Header />
        </div>
        <div style={{ backgroundColor: "green", padding: 2 }}>
          {this.state.changeBoard ? (
            <h2 onClick={this.changeBoardName}>Board</h2>
          ) : (
            <input placeholder="바꿀 보드이름을 적어주세요"></input>
          )}
          {/* 보드이름도 params로 수정 */}
          {this.state.todos.map(todo => (
            <Todos key={todo} todo={todo} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
