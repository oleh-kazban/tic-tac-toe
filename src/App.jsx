import { useReducer, useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { gameReducer, getActivePlayer, getBoard, getWinner, isDraw } from "./game";

const PLAYERS = {
    X: 'Player1',
    O: 'Player2'
  };

function App() {
  const [players, setPlayers] = useState({...PLAYERS})
  const [gameTurns, dispatch] = useReducer(gameReducer, []);
  const currentPlayer = getActivePlayer(gameTurns);
  const board = getBoard(gameTurns);
  const winner = getWinner(board);
  const draw = isDraw(board);
  const handleTurn = (rowIndex, columnIndex) => dispatch({ type: 'turn', rowIndex, columnIndex });
  const handleRematch = () => {
    dispatch({ type: 'reset' });
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
