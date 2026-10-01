const GameOver = ({winner, handleRematch}) => {
    return <div id="game-over">
        <h2>Game over!</h2>
        { winner ? <p>{winner} won!</p> : <p>It is a DRAW!</p>}
        <p><button onClick={handleRematch}>Rematch!</button></p>
    </div>
}

export default GameOver;
