import assert from "node:assert/strict";
import test from "node:test";

import {
  gameReducer,
  getActivePlayer,
  getBoard,
  getWinner,
  isDraw,
} from "../src/game.js";

function play(moves) {
  return moves.reduce(
    (turns, [rowIndex, columnIndex]) =>
      gameReducer(turns, { type: "turn", rowIndex, columnIndex }),
    [],
  );
}

test("starts with X and alternates turns", () => {
  const turns = play([
    [0, 0],
    [1, 1],
  ]);

  assert.equal(getActivePlayer([]), "X");
  assert.equal(turns[0].player, "O");
  assert.equal(getActivePlayer(turns), "X");
  assert.deepEqual(getBoard(turns), [
    ["X", null, null],
    [null, "O", null],
    [null, null, null],
  ]);
});

test("rejects occupied and out-of-range squares without changing turns", () => {
  const turns = play([[0, 0]]);

  for (const [rowIndex, columnIndex] of [
    [0, 0],
    [-1, 0],
    [0, 3],
    [1.5, 1],
  ]) {
    assert.equal(
      gameReducer(turns, { type: "turn", rowIndex, columnIndex }),
      turns,
    );
  }
});

test("detects a win and rejects further moves", () => {
  const turns = play([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
    [2, 0],
  ]);

  assert.equal(getWinner(getBoard(turns)), "X");
  assert.equal(gameReducer(turns, { type: "turn", rowIndex: 2, columnIndex: 2 }), turns);
});

test("detects a draw", () => {
  const turns = play([
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [1, 1],
    [2, 1],
    [2, 2],
    [2, 0],
  ]);
  const board = getBoard(turns);

  assert.equal(getWinner(board), null);
  assert.equal(isDraw(board), true);
  assert.equal(gameReducer(turns, { type: "turn", rowIndex: 0, columnIndex: 0 }), turns);
});

test("resets the game", () => {
  const turns = play([[1, 1]]);

  assert.deepEqual(gameReducer(turns, { type: "reset" }), []);
});
