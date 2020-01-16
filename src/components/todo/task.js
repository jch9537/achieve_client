import React, { Component } from "react";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeTask: true
    };
  }
  changeTaskName = () => {
    this.setState({ changeTask: !this.state.changeTask });
  };
  render() {
    return (
      <div style={{ backgroundColor: "blue", margin: 3, padding: 2 }}>
        {this.state.changeTask ? (
          <span onClick={this.changeTaskName}>
            {this.props.task} <span> 삭제</span>
          </span>
        ) : (
          <input placeholder="바꿀태스크이름을 적어주세요"></input>
        )}
      </div>
    );
  }
}

export default Task;
