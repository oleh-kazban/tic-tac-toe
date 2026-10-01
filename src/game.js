import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const BOARD_SIZE = 3;
const EMPTY_BOARD = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(null),
);

export function getActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
}

export function getBoard(gameTurns) {
  const board = EMPTY_BOARD.map((row) => [...row]);

  for (const { square, player } of gameTurns) {
    board[square.rowIndex][square.columnIndex] = player;
  }

  return board;
}

export function getWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const [first, second, third] = combination.map(
      ({ row, column }) => board[row][column],
    );

    if (first && first === second && first === third) {
      return first;
    }
  }

  return null;
}

export function isDraw(board) {
  return !getWinner(board) && board.every((row) => row.every(Boolean));
}

export function gameReducer(gameTurns, action) {
  switch (action.type) {
    case "turn": {
      const { rowIndex, columnIndex } = action;
      const isValidSquare =
        Number.isInteger(rowIndex) &&
        Number.isInteger(columnIndex) &&
        rowIndex >= 0 &&
        rowIndex < BOARD_SIZE &&
        columnIndex >= 0 &&
        columnIndex < BOARD_SIZE;

      if (!isValidSquare) {
        return gameTurns;
      }

      const board = getBoard(gameTurns);

      if (getWinner(board) || isDraw(board) || board[rowIndex][columnIndex]) {
        return gameTurns;
      }

      return [
        {
          square: { rowIndex, columnIndex },
          player: getActivePlayer(gameTurns),
        },
        ...gameTurns,
      ];
    }
    case "reset":
      return [];
    default:
      return gameTurns;
  }
}
