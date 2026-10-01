import { useState } from "react";

const Player = ({ initialPlayerName, playerSymbol, isActive, onPlayerNameChange }) => {
    const [playerName, setPlayerName] = useState(initialPlayerName);
    const [isEditing, setIsEditing] = useState(false);
   
    const handleIsEditing = () => {
        setIsEditing(value => !value)
        onPlayerNameChange(playerSymbol, playerName);
    };
    const handlePlayerNameChange = (event) => setPlayerName(event.target.value);

    const playerNameComponent = !isEditing
        ? <span className="player-name">{playerName}</span>
        : <input type="text" placeholder="Player name" required value={playerName} onChange={handlePlayerNameChange}/>;
    const buttonComponent = <button onClick={handleIsEditing}>{!isEditing ? 'Edit' : 'Save'}</button>

    return <li className={isActive ? 'active' : undefined}>
            <span className="player">
                { playerNameComponent }
                <span className="player-symbol">{playerSymbol}</span>
            </span>
            {buttonComponent}
    </li>
};

export default Player;
