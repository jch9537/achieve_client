import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import api from "../api";
import Header from "../header/Header";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Setting from "../pages/Setting";

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      boards: [],
      newBoard: "",
      board: [],
      changeBoard: "",
      isCheckChangeBoard: true
    };
  }

  createBoard = e => {
    let __newBoard = e.target.value;
    this.setState({ newBoard: __newBoard });
  };

  enterSubmitNewBoard = () => {
    const { newBoard, isCheckCreateBoard, boards } = this.state;

    if (!newBoard) {
      alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      if (window.event.keyCode === 13) {
        let body = {
          newBoard: newBoard
        };
        api("/boards", "POST", body).then(res => {
          console.log(res);
          this.setState({ boards: res.boards, newBoard: "" });
        });
      }
    }
  };

  clickSubmitNewBoard = () => {
    const { newBoard, isCheckCreateBoard, boards } = this.state;

    if (!newBoard) {
      alert("생성할 board의 이름을 적어주세요");
      // this.setState({ isCheckCreateBoard: !isCheckCreateBoard });
    } else {
      let body = {
        newBoard: newBoard
      };
      api("/boards", "POST", body).then(res => {
        console.log(res);
        this.setState({ boards: res.boards, newBoard: "" });
      });
    }
  };

  deleteBoard = board => {
    // console.log(board);
    // 해당보드네임이나 아이디를 서버로 보낸뒤에 db에서 삭제를 한 후 db에서 전체 board정보를 가져와 setState해줘 렌더
    let body = {
      boardId: board
    };
    console.log("삭제보드바디", board);
    api("/boards", "DELETE", body).then(res => {
      console.log("삭제응답", res);
      this.setState({ boards: res.boards });
    });
    //req를 삭제할 것을 보내 db에서 삭제한 후 전체boards를 가져와서 this.setState({boards: res})로 처리
  };

  selectBoard = (selectBoardId, selectBoardName) => {
    console.log("셀렉트보드", selectBoardId, selectBoardName);
    let selectBoard = {
      board_id: selectBoardId,
      board_name: selectBoardName
    };
    this.setState({ board: selectBoard });
  };

  isChangeBoardName = () => {
    this.setState({ isCheckChangeBoard: !this.state.isCheckChangeBoard });
  };

  changeBoardName = e => {
    console.log("새보드이름", e.target.value);
    let __changeBoard = e.target.value;
    this.setState({ changeBoard: __changeBoard });
  };

  submitChangeBoard = () => {
    const { board, changeBoard, isCheckChangeBoard } = this.state;

    if (!changeBoard) {
      alert("수정할 board의 이름을 적어주세요");
      this.setState({ isCheckChangeBoard: !isCheckChangeBoard });
    } else {
      let body = {
        boardId: board.board_id,
        changeBoard: changeBoard
      };
      if (window.event.keyCode === 13) {
        api("/boards", "PUT", body)
          .then(res => {
            console.log(res);
            this.setState({
              boards: res.boards,
              board: { board_id: board.board_id, board_name: changeBoard },
              changeBoard: "",
              isCheckChangeBoard: !isCheckChangeBoard
            });
          })
          .catch(err => {
            alert(err.message);
          });
      }
    }
  };

  componentDidMount() {
    console.log("컴포넌트 디드마운트");
    api("/boards", "GET")
      .then(res => {
        console.log("메인라우트프롭스 보드가져오기", res);
        this.setState({ boards: res.boards });
      })
      .catch(err => {
        console.log("메인라우트프롭스 보드가져오기 에러", err);
      });
  }

  render() {
    console.log("메인라우터 프롭스", this.props);
    console.log("메인라우터 스테이트", this.state);
    return (
      <div>
        <Header userId={this.state.userId} {...this.props} />
        <Switch>
          <Route
            path="/:userId/main"
            render={props => (
              <Main
                userId={this.state.userId}
                boards={this.state.boards}
                board={this.state.board}
                newBoard={this.state.newBoard}
                createBoard={this.createBoard}
                enterSubmitNewBoard={this.enterSubmitNewBoard}
                clickSubmitNewBoard={this.clickSubmitNewBoard}
                selectBoard={this.selectBoard}
                deleteBoard={this.deleteBoard}
                {...props}
              />
            )}
          />
          <Route
            path="/board/:board_id/:board_name"
            render={props => (
              <Board
                userId={this.state.userId}
                board={this.state.board}
                changeBoard={this.state.changeBoard}
                isCheckChangeBoard={this.state.isCheckChangeBoard}
                isChangeBoardName={this.isChangeBoardName}
                changeBoardName={this.changeBoardName}
                submitChangeBoard={this.submitChangeBoard}
                {...props}
              />
            )}
          />
          <Route
            path="/:userId/setting"
            render={props => <Setting userId={this.state.userId} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
