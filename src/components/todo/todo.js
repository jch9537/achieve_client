import React, { Component } from "react";

import api from "../../api";
import Task from "./task";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      chageTodo: "",
      isCheckChangeTodo: false,
      tasks: null,
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
      // alert("수정할 todo의 이름을 적어주세요");
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
          .catch(err => console.log(err));
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
      // alert("생성할 task의 이름을 적어주세요");
      this.setState({ isCheckCreateTask: !isCheckCreateTask });
    } else {
      if (window.event.keyCode === 13) {
        let body = {
          todo_id: this.props.todo.id,
          newTask: newTask
        };
        api("/tasks", "POST", body)
          .then(res => {
            // console.log("태스크 포스트응답", res);
            this.setState({
              tasks: res.tasks,
              newTask: "",
              isCheckCreateTask: !this.state.isCheckCreateTask
            });
          })
          .catch(err => console.log(err));
      }
    }
  };

  deleteTask = task_id => {
    let body = {
      todo_id: this.props.todo.id,
      task_id: task_id
    };
    api("/tasks", "DELETE", body)
      .then(res => {
        // console.log("task삭제 응답", res);
        this.setState({
          tasks: res.tasks
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    api(`/tasks/${this.props.todo.id}`, "GET")
      .then(res => {
        // console.log("태스크 응답", res);
        this.setState({ tasks: res.tasks });
      })
      .catch(err => console.log(err));
  }

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
                <div key={task.id}>
                  <Task task={task} deleteTask={this.deleteTask} />
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default Todo;
