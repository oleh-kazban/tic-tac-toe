import { useState } from "react";

const Player = ({ initialPlayerName, playerSymbol, isActive, onPlayerNameChange }) => {
    const [playerName, setPlayerName] = useState(initialPlayerName);
    const [isEditing, setIsEditing] = useState(false);

    const [validationError, setValidationError] = useState("");
    const inputId = `player-name-${playerSymbol}`;
    const errorId = `${inputId}-error`;

    const handleStartEditing = () => {
        setValidationError("");
        setIsEditing(true);
    };

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value);
        if (event.target.value.trim()) {
            setValidationError("");
        }
    };

    const handleSave = (event) => {
        event.preventDefault();
        const trimmedName = playerName.trim();

        if (!trimmedName) {
            setValidationError("Player name cannot be empty.");
            return;
        }

        setPlayerName(trimmedName);
        setValidationError("");
        onPlayerNameChange(playerSymbol, trimmedName);
        setIsEditing(false);
    };

    return <li className={isActive ? 'active' : undefined}>
            {isEditing ? (
                <form className="player player-edit-form" onSubmit={handleSave}>
                    <label className="visually-hidden" htmlFor={inputId}>
                        Name for player {playerSymbol}
                    </label>
                    <input
                        id={inputId}
                        type="text"
                        placeholder="Player name"
                        required
                        value={playerName}
                        onChange={handlePlayerNameChange}
                        aria-invalid={Boolean(validationError)}
                        aria-describedby={validationError ? errorId : undefined}
                    />
                    <span className="player-symbol">{playerSymbol}</span>
                    <button type="submit">Save</button>
                    {validationError && <span id={errorId} className="player-name-error" role="alert">{validationError}</span>}
                </form>
            ) : (
                <>
                    <span className="player">
                        <span className="player-name">{playerName}</span>
                        <span className="player-symbol">{playerSymbol}</span>
                    </span>
                    <button type="button" onClick={handleStartEditing}>Edit</button>
                </>
            )}
    </li>
};

export default Player;
