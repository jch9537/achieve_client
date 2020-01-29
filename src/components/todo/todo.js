import React, { Component } from "react";

import Task from "./task";
import api from "../../api";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      chageTodo: "",
      isCheckChangeTodo: false,
      task: null,
      // tasks: ["할일1", "할일2"],
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
        todo_id: Number(this.props.todo.id),
        changeTodo: chageTodo
      };
      if (window.event.keyCode === 13) {
        api("/todos", "PUT", body)
          .then(res => {
            // console.log(res);
            this.setState({
              todo: res.todo,
              chageTodo: "",
              isCheckChangeTodo: !isCheckChangeTodo
            });
          })
          .catch(err => alert(err.message));
      }
    }
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
    const { todo, isCheckChangeTodo, isCheckCreateTask, tasks } = this.state;
    const { deleteTodo } = this.props;
    console.log("todos프롭", this.props);
    console.log("todos스테이트", this.state);
    return (
      <div style={{ backgroundColor: "yellow", margin: 2 }}>
        <div>
          {isCheckChangeTodo ? (
            <input
              onChange={e => this.changeTodoName(e)}
              onKeyUp={this.submitChangeTodo}
              placeholder="Chage Todo Name"
            ></input>
          ) : todo ? (
            <div>
              <span style={{ fontSize: 20 }} onClick={this.isChangeTodoName}>
                <b>{todo.todo_name}</b>
              </span>
              <span onClick={() => deleteTodo(todo.id)}>삭제</span>
            </div>
          ) : (
            <div>
              <span style={{ fontSize: 20 }} onClick={this.isChangeTodoName}>
                <b>{this.props.todo.todo_name}</b>
              </span>
              <span onClick={() => deleteTodo(this.props.todo.id)}>삭제</span>
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
          {tasks
            ? tasks.map(task => (
                <div key={task}>
                  <Task task={task} />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Todo;