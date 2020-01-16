import React, { Component } from "react";

import Task from "./task";

class Todos extends Component {
  state = {
    todos: ["할일1", "할일2"],
    changeTodo: true
  };
  changeTodoName = () => {
    // console.log("이름바꾸기", e.todo);
    this.setState({ changeTodo: !this.state.changeTodo });
  };

  render() {
    return (
      <div style={{ backgroundColor: "yellow", margin: 2 }}>
        {this.state.changeTodo ? (
          <div onClick={this.changeTodoName}>
            {this.props.todo} <span>삭제</span>
          </div>
        ) : (
          <input placeholder="바꿀투두이름을 넣어주세요"></input>
        )}

        {this.state.todos.map(task => (
          <div key={task}>
            <Task task={task} />
          </div>
        ))}
      </div>
    );
  }
}

export default Todos;
