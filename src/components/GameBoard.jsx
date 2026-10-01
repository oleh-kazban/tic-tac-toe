const GameBoard = ({ onTurn, board, isGameOver, boardRef }) => {
    return <ol id="game-board" aria-label="Tic-Tac-Toe board" tabIndex={-1} ref={boardRef}>
        {board.map((row, rowIndex) => <li key={`row-${rowIndex}`}>
            <ol>
                { row.map((playerSymbol, columnIndex) => <li key={`column-${columnIndex}`}><button
                    aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}${playerSymbol ? `, ${playerSymbol}` : ", empty"}`}
                    disabled={playerSymbol != null || isGameOver}
                    onClick={() => onTurn(rowIndex, columnIndex)}
                >{playerSymbol}</button></li>)}
            </ol>
        </li>)}
    </ol>
}

export default GameBoard;