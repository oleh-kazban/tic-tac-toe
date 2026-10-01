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
| `npm test` | Run game logic tests with Node's built-in test runner. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint over JavaScript and JSX files. |

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
   App.jsx               UI composition and player-name state
   game.js               Game reducer, move validation, and result selectors
  index.css             Global layout, component styles, and animations
  index.jsx             React application entry point
  winning-combinations.js
                        Winning board coordinates
index.html              HTML shell served by Vite
vite.config.js          Vite and React plugin configuration
package.json            Dependencies and npm scripts
.eslintrc.cjs           ESLint rules
tests/game.test.js      Game logic tests
```

## Refactoring plan

Progress, prioritizing correctness and accessibility before structural cleanup:

1. [x] **Make game rules authoritative in one place.** Turn handling and result calculations live in `src/game.js`; the reducer rejects occupied/out-of-range moves and moves after a win or draw.
2. [x] **Improve accessible interaction.** Board cells have row/column labels, turn/results are announced, the game-over overlay is keyboard accessible, and the board/player controls are unavailable until rematch.
3. [x] **Harden player-name editing.** Player names are edited in a labeled form, whitespace-only values are rejected, and validation feedback is announced accessibly.
4. [x] **Make layout and motion resilient.** A three-column grid keeps each board row intact, player controls reflow on narrow screens, and animations/transitions are minimized for `prefers-reduced-motion` users.
5. [x] **Fix asset resolution and establish quality checks.** The background image uses a public-root URL, ESLint configuration is checked in, and Node tests cover turn switching, invalid moves, wins, draws, and resets.
6. [ ] **Polish maintainability.** Standardize formatting and quote style, remove unused imports/parameters, and consider extracting game logic from `App.jsx` once it has tests.
