import { FLIP_CELL, ITERATE, CLEAR_BOARD } from '../constants/ActionTypes';


const getInitialBoard = () => {
  return [...Array(32).keys()].map(() => [...Array(32).keys()].map(() => false));
}

const initialState = {
  board: getInitialBoard()
};

const iterateBoard = board => {
  return board.map((row, y) =>
    row.map((cell, x) =>
      iterateCellState(x, y, board)));
}

const iterateCellState = (x, y, board) => {
  let isAlive = board[y][x];
  let numLiveNeighbors = findLiveNeighbors(x, y, board);
  if(isAlive) {
    return numLiveNeighbors === 2 || numLiveNeighbors === 3;
  } else {
    return numLiveNeighbors === 3;
  }
}

const findLiveNeighbors = (x, y, board) => {
  let minY = y-1 < 0 ? 0 : y-1;
  let minX = x-1 < 0 ? 0 : x-1;

  let boardSlice = board.slice(minY, y+2).map(row => row.slice(minX, x+2));
  let sliceTotal = boardSlice.reduce(
    (total, row) => total + row.reduce((tot, isAlive) => tot + (isAlive ? 1 : 0), 0),
    0
  );
  return sliceTotal - (board[y][x] ? 1 : 0);
}

const gameReducer = (state = initialState, action) => {

  switch(action.type) {
    case FLIP_CELL:
      let x = action.payload.x;
      let y = action.payload.y;
      let newBoard = [...state.board];
      newBoard[y] = [...state.board[y]];
      newBoard[y][x] = !state.board[y][x];
      return {
        ...state,
        board: newBoard
      };

    case ITERATE:
      let oldBoard = state.board;
      let nb = iterateBoard(oldBoard);
      return {
        ...state,
        board: nb
      };

    case CLEAR_BOARD:
      return {
        ...state,
        board: getInitialBoard()
      };

    default:
      return state;
  }
};

export default gameReducer;