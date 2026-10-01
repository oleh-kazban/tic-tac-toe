import { useEffect, useRef } from "react";

const GameOver = ({winner, handleRematch}) => {
    const rematchButtonRef = useRef(null);

    useEffect(() => {
        rematchButtonRef.current?.focus();
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            rematchButtonRef.current?.focus();
        }
    };

    return <div
        id="game-over"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
        onKeyDown={handleKeyDown}
    >
        <h2 id="game-over-title">Game over!</h2>
        { winner ? <p>{winner} won!</p> : <p>It is a DRAW!</p>}
        <p><button ref={rematchButtonRef} onClick={handleRematch}>Rematch!</button></p>
    </div>
}

export default GameOver;
