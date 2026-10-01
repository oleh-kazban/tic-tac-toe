const Log = ({ gameTurns }) => {
    return <ol id="log">
        {gameTurns.map((turn) => {
            const { square, player } = turn;
            const { rowIndex, columnIndex } = square;

            return <li key={`turn-col:${columnIndex}-row:${rowIndex}`}>{player} selected: [{rowIndex}:{columnIndex}]</li>;
        })}
    </ol>
}

export default Log;
