import React from "react";
import { Link } from "react-router-dom";

// 안녕하세요 유저네임 추가

const Main = props => {
  const {
    boards,
    newBoard,
    createBoard,
    enterSubmitNewBoard,
    clickSubmitNewBoard,
    selectBoard,
    deleteBoard
  } = props;

  console.log("메인프롭스", props);

  return (
    <div>
      <div style={{ backgroundColor: "#a1c3e2", padding: 10 }}>
        <h2>Main</h2>
        <div>
          <input
            type="text"
            value={newBoard}
            placeholder="Create New Board"
            onChange={e => createBoard(e)}
            onKeyUp={enterSubmitNewBoard}
          ></input>
          <span onClick={clickSubmitNewBoard}>Create</span>
        </div>
        <div>
          {boards.length !== 0
            ? boards.map(board => (
                <div
                  key={`${board.board_name}${board.id}`}
                  style={{
                    backgroundColor: "lightgrey",
                    width: 200,
                    margin: 10,
                    padding: 5
                  }}
                  onClick={() => selectBoard(board.id, board.board_name)}
                >
                  <Link to={`/board/${board.id}/${board.board_name}`}>
                    {board.board_name}
                  </Link>
                  <span onClick={() => deleteBoard(board.id)}> 삭제</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
