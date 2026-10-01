import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
const PLAYERS = {
    X: 'Player1',
    O: 'Player2'
  };

function getActivePlayer(gameTurns) {
  return (gameTurns.length && gameTurns[0].player === 'X') ? 'O' : 'X';
}

function getWinner(board) {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = board[combination[0].row][combination[0].column];
    const secondSymbol = board[combination[1].row][combination[1].column];
    const thirdSymbol = board[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      return firstSymbol;
    }
  }

  return null;
}

function getIsDraw(board) {
  return !getWinner(board) && board.every(row => row.every(column => !!column));
}

function getBoard(gameTurns) {
    const board = [...INITIAL_GAME_BOARD.map(row => [...row])];

  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { rowIndex, columnIndex } = square;

      board[rowIndex][columnIndex] = player;
  }

  return board;
}

function App() {
  const [players, setPlayers] = useState({...PLAYERS})
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = getActivePlayer(gameTurns);
  const board = getBoard(gameTurns);
  const winner = getWinner(board);
  const draw = getIsDraw(board);
  const handleTurn = (rowIndex, columnIndex) => {
    if (winner) {
      return;
    }

    setGameTurns(prevTurns => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [{ square: {rowIndex, columnIndex}, player: currentPlayer, }, ...prevTurns];


      return updatedTurns;
    });
  };
  const handleRematch = () => {
    setGameTurns(() => []);
  }
  const handlePlayerNameChange = (symbol, playerName) => {
    setPlayers(prev => ({
      ...prev,
      [symbol]: playerName
    }))
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialPlayerName={players.X} playerSymbol={'X'} isActive={currentPlayer === 'X'} onPlayerNameChange={handlePlayerNameChange} />
          <Player initialPlayerName={players.O} playerSymbol={'O'} isActive={currentPlayer === 'O'} onPlayerNameChange={handlePlayerNameChange} />
        </ol>
        { (winner || draw) && <GameOver winner={players[winner]} handleRematch={handleRematch} />}
        <GameBoard onTurn={handleTurn} board={board}/>
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  )
}

export default App
