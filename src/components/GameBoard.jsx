const GameBoard = ({ onTurn, board }) => {
    return <ol id="game-board">
        {board.map((row, rowIndex) => <li key={`row-${rowIndex}`}>
            <ol>
                { row.map((playerSymbol, columnIndex) => <li key={`column-${columnIndex}`}><button disabled={playerSymbol != null} onClick={() => onTurn(rowIndex, columnIndex)}>{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>
}

export default GameBoard;