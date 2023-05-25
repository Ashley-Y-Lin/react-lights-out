import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let r = 0; r < nrows; r++) {
      let row = [];
      for (let c = 0; c < ncols; c++) {
        row.push((Math.random() <= chanceLightStartsOn) ? true : false);
      }
      initialBoard.push(row);
    }
    console.log("initialBoard", initialBoard);
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let lightsOn = board.filter(cell => cell === true);
    return lightsOn.length === 0 ? true : false;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const oldBoardCopy = board.map((rowValues) => rowValues.map(colValue => colValue));

      // TODO: in the copy, flip this cell and the cells around it
      for (let r = Math.max(x - 1, 0); r <= Math.min(x + 1, nrows - 1); r++) {
        if (r === x) {
          for (let c = Math.max(y - 1, 0); c <= Math.min(y + 1, ncols - 1); c++) {
            oldBoardCopy[r][c] = !oldBoardCopy[r][c];
          }
        } else {
          oldBoardCopy[r][y] = !oldBoardCopy[r][y];
        }

        for (let c = Math.max(y - 1, 0); c <= Math.min(y + 1, 0); c++) {


        }
      }

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else


  // TODO

  // make table board
  return <table>
    <tbody>
      {board.map((row, rowIndex) =>
        <tr key={rowIndex}>{[...row].map((cell, cellIndex) =>
          <Cell key={rowIndex * cellIndex + cellIndex} flipCellsAroundMe={() => flipCellsAround(`${cellIndex}-${rowIndex}`)} isLit={cell} />)}
        </tr>
      )}
    </tbody>
  </table>;

  // TODO
}

export default Board;
