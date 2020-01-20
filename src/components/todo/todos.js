import React, { Component } from "react";

import Task from "./task";
import api from "../../api";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: ["할일1", "할일2"],
      todo: this.props.todo,
      chageTodo: "",
      isCheckChangeTodo: false,
      newTask: "",
      isCheckCreateTask: false
    };
  }
  isChangeTodoName = () => {
    // console.log("이름바꾸기", e.todo);
    this.setState({ isCheckChangeTodo: !this.state.isCheckChangeTodo });
  };

  changeTodoName = e => {
    // console.log("바꿀투두", e.target.value);
    let __chageTodo = e.target.value;
    this.setState({ chageTodo: __chageTodo });
  };

  submitChangeTodo = () => {
    const { isCheckChangeTodo, chageTodo } = this.state;

    if (!chageTodo) {
      alert("수정할 todo의 이름을 적어주세요");
      this.setState({ isCheckChangeTodo: !isCheckChangeTodo });
    } else {
      let body = {
        changeTodo: chageTodo
      };
      if (window.event.keyCode === 13) {
        api("/todos", "PUT", body).then(res => {
          // console.log(res);
          this.setState({
            todo: res.changeTodo,
            chageTodo: "", // 수정 후 빈내용을 보내면 alert안띄우고 이전값으로 돌아가려면 지우면 됨
            isCheckChangeTodo: !isCheckChangeTodo
          });
        });
      }
    }
  };

  deleteTodo = () => {
    let body = {
      todo: this.state.todo
    };
    api("/todos", "DELETE", body).then(res => console.log(res));
  };

  isCreateTask = () => {
    this.setState({ isCheckCreateTask: !this.state.isCheckCreateTask });
  };

  createTask = e => {
    let __newTask = e.target.value;
    this.setState({ newTask: __newTask });
  };

  submitNewTask = () => {
    const { newTask, isCheckCreateTask, tasks } = this.state;

    if (!newTask) {
      alert("생성할 task의 이름을 적어주세요");
      this.setState({ isCheckCreateTask: !isCheckCreateTask });
    } else {
      if (window.event.keyCode === 13) {
        let __tasks = tasks.slice();
        let __newTask = newTask;
        __tasks.push(__newTask);
        this.setState({
          tasks: __tasks,
          isCheckCreateTask: !isCheckCreateTask,
          newTask: ""
        });
        //위에껀 클라이언트 테스트용
        let body = {
          newTask_name: newTask
        };
        api("/tasks", "POST", body).then(res => {
          console.log(res);
          // this.setState({tasks: res.tasks새로운태스크들}) 서버완성 후 수정
        });
      }
    }
  };

  render() {
    const { isCheckChangeTodo, isCheckCreateTask, tasks, todo } = this.state;
    // console.log("todos프롭", this.props);
    // console.log("todos스테이트", this.state);
    return (
      <div style={{ backgroundColor: "yellow", margin: 2 }}>
        <div>
          {isCheckChangeTodo ? (
            <input
              onChange={e => this.changeTodoName(e)}
              onKeyUp={this.submitChangeTodo}
              placeholder="Chage Todo Name"
            ></input>
          ) : (
            <div>
              <span style={{ fontSize: 20 }} onClick={this.isChangeTodoName}>
                <b>{todo}</b>
              </span>
              <span onClick={this.deleteTodo}>삭제</span>
            </div>
          )}
        </div>
        {isCheckCreateTask ? (
          <input
            onKeyUp={this.submitNewTask}
            onChange={e => this.createTask(e)}
            placeholder="Create Task"
          ></input>
        ) : (
          <div onClick={this.isCreateTask}>+ task생성</div>
        )}

        <div>
          {tasks.map(task => (
            <div key={task}>
              <Task task={task} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todos;
