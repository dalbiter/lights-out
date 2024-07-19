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
const random = () => Math.random();

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const [count, setCount] = useState(0)

  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        let lit = random() < chanceLightStartsOn ? true : false;
        row.push(lit);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
    setCount(count + 1)
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // TODO

  // make table board

  let tableBoard = [];

  for(let y=0; y<nrows; y++) {
    let row = [];
    for(let x=0; x<ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
            <Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)}/>
        )
    }
    tableBoard.push(<tr key={y}>{row}</tr>)
  }
  console.log(tableBoard)
  // TODO

  return (
    <div className="Board">
      <table>
        <tbody>
          {tableBoard}
        </tbody>
      </table>
      <div className="Board-score">
        <p>Number of Moves: <b>{count}</b></p>
      </div>
    </div>
  );
}

export default Board;
