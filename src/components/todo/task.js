import React, { Component } from "react";
import { FaRegTrashAlt, FaTrashAlt, FaTrash, FaRegEdit } from "react-icons/fa";

import api from "../../util/api";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
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
      // alert("수정할 task의 이름을 적어주세요");
      this.setState({ isCheckChageTask: !isCheckChageTask });
    } else {
      let body = {
        task_id: this.props.task.id,
        chageTask: changeTask
      };
      api("/tasks", "PUT", body)
        .then(res => {
          // console.log(res);
          this.setState({
            task: res.task,
            changeTask: "",
            isCheckChageTask: !isCheckChageTask
          });
        })
        .catch(err => console.log(err));
    }
  };

  submitEnterChangeTask = () => {
    const { isCheckChageTask, changeTask } = this.state;

    if (!changeTask) {
      // alert("수정할 task의 이름을 적어주세요");
      this.setState({ isCheckChageTask: !isCheckChageTask });
    } else {
      let body = {
        task_id: this.props.task.id,
        chageTask: changeTask
      };
      if (window.event.keyCode === 13) {
        api("/tasks", "PUT", body)
          .then(res => {
            // console.log(res);
            this.setState({
              task: res.task,
              changeTask: "",
              isCheckChageTask: !isCheckChageTask
            });
          })
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    const { isCheckChageTask, task } = this.state;
    const { deleteTask } = this.props;
    console.log("태스크스테이트", this.state);
    console.log("태스크프롭", this.props);

    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          margin: 5,
          padding: 2
        }}
      >
        {isCheckChageTask ? (
          <div
            className="input-group input-group-sm mb-3"
            style={{ width: "100%" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Chage Task Name"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              onChange={e => this.changeTaskName(e)}
              onKeyUp={this.submitEnterChangeTask}
              style={{ border: "white" }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon1"
                onClick={this.submitChangeTask}
              >
                <FaRegEdit />
              </button>
            </div>
          </div>
        ) : task ? (
          <div>
            <span style={{ fontSize: 15 }} onClick={this.isChangeTaskName}>
              <b>{task.task_name}</b>
            </span>
            <FaRegTrashAlt onClick={() => deleteTask(task.id)} />
          </div>
        ) : (
          <div>
            <span style={{ fontSize: 15 }} onClick={this.isChangeTaskName}>
              <b>{this.props.task.task_name}</b>
            </span>
            <FaRegTrashAlt onClick={() => deleteTask(this.props.task.id)} />
            {/* //헷갈릴까봐 this.props그냥 둠 */}
          </div>
        )}
      </div>
    );
  }
}

export default Task;
