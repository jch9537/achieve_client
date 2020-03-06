import React, { Component } from "react";
import { FaRegTrashAlt, FaTrashAlt, FaTrash, FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import api from "../../util/api";
import Task from "./task";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: null,
      chageTodo: "",
      isCheckChangeTodo: false,
      tasks: [],
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
  };

  submitEnterChangeTodo = () => {
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
    const { newTask, isCheckCreateTask } = this.state;

    if (!newTask) {
      // alert("생성할 task의 이름을 적어주세요");
      this.setState({ isCheckCreateTask: !isCheckCreateTask });
    } else {
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
            isCheckCreateTask: !isCheckCreateTask
          });
        })
        .catch(err => console.log(err));
    }
  };

  submitEnterNewTask = () => {
    const { newTask, isCheckCreateTask } = this.state;

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
              isCheckCreateTask: !isCheckCreateTask
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
      <div
        className="col-md"
        style={{
          backgroundColor: "#e9ecef",
          borderRadius: 5,
          padding: 10,
          margin: 2
        }}
      >
        <div>
          {isCheckChangeTodo ? (
            <div className="input-group mb-3" style={{ width: "100%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Chage Todo Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                onChange={e => this.changeTodoName(e)}
                onKeyUp={this.submitEnterChangeTodo}
                style={{ border: "white" }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark"
                  type="button"
                  id="button-addon1"
                  onClick={this.submitChangeTodo}
                >
                  <FaRegEdit />
                </button>
              </div>
            </div>
          ) : todo ? (
            <div>
              <span style={{ fontSize: 20 }} onClick={this.isChangeTodoName}>
                <b>{todo.todo_name}</b>
              </span>
              <FaRegTrashAlt onClick={() => deleteTodo(todo.id)} />
            </div>
          ) : (
            <div>
              <span style={{ fontSize: 20 }} onClick={this.isChangeTodoName}>
                <b>{this.props.todo.todo_name}</b>
              </span>
              <FaRegTrashAlt onClick={() => deleteTodo(this.props.todo.id)} />
              {/* //헷갈릴까봐 this.props그냥 둠 */}
            </div>
          )}
        </div>
        {isCheckCreateTask ? (
          <div className="input-group mb-3" style={{ width: "100%" }}>
            <div className="input-group-prepend">
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon1"
                onClick={this.submitNewTask}
              >
                <IoMdAdd />
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Create Task"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              onKeyUp={this.submitEnterNewTask}
              onChange={e => this.createTask(e)}
              style={{ border: "white" }}
            />
          </div>
        ) : (
          <div onClick={this.isCreateTask}>+ task생성</div>
        )}
        <div>
          {!tasks.length
            ? null
            : tasks.map(task => (
                <div key={task.id}>
                  <Task task={task} deleteTask={this.deleteTask} />
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default Todo;
