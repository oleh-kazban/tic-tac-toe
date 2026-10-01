# Tic-Tac-Toe

A two-player Tic-Tac-Toe game built with React and Vite. Players can edit their names, take turns on a 3 × 3 board, review the move history, and start a rematch after a win or draw.

## Requirements

- Node.js (LTS recommended)
- npm

## Getting started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the local development server:
   ```sh
   npm run dev
   ```
3. Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production bundle into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint over JavaScript and JSX files. |

There is no test script or checked-in ESLint configuration at present. Add a project ESLint configuration before relying on `npm run lint` as a repeatable quality check.

## How to play

- X and O alternate turns, with X starting.
- Select an empty square to make a move.
- The first player to complete a row, column, or diagonal wins.
- If all squares are filled without a winner, the game is a draw.
- Edit player names using the controls beside each player; select **Rematch!** to clear the board and play again.

## Project structure

```text
public/                 Static images and other public assets
src/
  components/
    GameBoard.jsx       3 × 3 board and square buttons
    GameOver.jsx        Win/draw result and rematch action
    Log.jsx             Move history
    Player.jsx          Player display and name editing
  App.jsx               Game state, turn handling, and result calculation
  index.css             Global layout, component styles, and animations
  index.jsx             React application entry point
  winning-combinations.js
                        Winning board coordinates
index.html              HTML shell served by Vite
vite.config.js          Vite and React plugin configuration
package.json            Dependencies and npm scripts
```

## Refactoring plan

Suggested order, prioritizing correctness and accessibility before structural cleanup:

1. **Make game rules authoritative in one place.** Move turn handling and result calculations into a small game-state module or reducer. Reject moves into occupied squares and moves after a win/draw in the state transition itself, rather than relying only on disabled UI buttons. Derive the active player, board, winner, and draw from a consistent state model.
2. **Improve accessible interaction.** Give each square an accessible row/column label, announce turn changes and game results with suitable live regions, and ensure the game-over state is keyboard accessible. Disable or otherwise make the board unavailable once the game has ended.
3. **Harden player-name editing.** Use a form or explicit validation so an empty name cannot be saved; associate the input with a label and keep the editing state and displayed name behavior clear.
4. **Make layout and motion resilient.** Use responsive board sizing so the board fits narrow viewports, and respect `prefers-reduced-motion` for pulsing and transition animations.
5. **Fix asset resolution and establish quality checks.** The background stylesheet references `bg-pattern-dark.png` as a relative CSS URL even though the image is in `public/`; switch to a root-relative public URL or move the asset into the stylesheet's asset pipeline. Add an ESLint configuration and tests for win, draw, turn switching, invalid moves, and rematches.
6. **Polish maintainability.** Standardize formatting and quote style, remove unused imports/parameters, and consider extracting game logic from `App.jsx` once it has tests.
