import React, { Component } from "react";

import api from "../../api";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      changeTask: "",
      isCheckChageTask: false
    };
  }
  isChangeTaskName = () => {
    this.setState({ isCheckChageTask: !this.state.isCheckChageTask });
  };

  changeTaskName = e => {
    let __changeTask = e.target.value;
    this.setState({ changeTask: __changeTask });
  };

  submitChangeTask = () => {
    const { isCheckChageTask, changeTask } = this.state;

    if (!changeTask) {
      alert("수정할 task의 이름을 적어주세요");
      this.setState({ isCheckChageTask: !isCheckChageTask });
    } else {
      let body = {
        chageTask: changeTask
      };
      if (window.event.keyCode === 13) {
        api("/tasks", "PUT", body).then(res => {
          console.log(res);
          this.setState({
            task: res.changeTask,
            changeTask: "",
            isCheckChageTask: !isCheckChageTask
          });
        });
      }
    }
  };

  deleteTask = () => {
    let body = {
      task: this.state.task
    };
    api("/tasks", "DELETE", body).then(res => console.log(res));
  };

  render() {
    const { isCheckChageTask, task } = this.state;
    // console.log('태스크스테이트', this.state)
    // console.log('태스크프롭', this.props)

    return (
      <div style={{ backgroundColor: "blue", margin: 3, padding: 2 }}>
        {isCheckChageTask ? (
          <input
            onChange={e => this.changeTaskName(e)}
            onKeyUp={this.submitChangeTask}
            placeholder="Chage Task Name"
          ></input>
        ) : (
          <div>
            <span style={{ fontSize: 15 }} onClick={this.isChangeTaskName}>
              <b>{task}</b>
            </span>
            <span onClick={this.deleteTask}> 삭제</span>
          </div>
        )}
      </div>
    );
  }
}

export default Task;
