import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {
  static defaultProps = {
    columns: 5,
    rows: 5,
    chanceLightStartsOn: 0.2,
  }

  constructor(props) {
    super(props);

    // FINISHED: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const { rows, columns, chanceLightStartsOn } = this.props;
    // FINISHED: create array-of-arrays of true/false values
    const board = Array.from({ length: rows },
      (row) => Array.from({ length: columns },
        (lit) => Math.random() < chanceLightStartsOn));
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { columns, rows } = this.props;
    let board = this.state.board.map(r => r.map(c => c));
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      // FINISHED: flip this cell and the cells around it
      if (x >= 0 && x < columns && y >= 0 && y < rows) {
        board[y][x] = !board[y][x];
        }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    //check winning board, return true if all cells are false
    function checkWin(board){
      let win = board.every( row => row.every ( lit => lit === false));
      return win;
    }

    // let newBoard = flipCell(y, x);
    this.setState({board,
                   hasWon: checkWin(board)});

  }

  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // FINISHED

    // make table board

    // FINISHED
    return (this.state.hasWon ?
      <p>YOU WON!</p>
      :
      <tbody>
        {this.state.board.map((row, y) =>
          <tr key = {y}>
            {row.map((cell, x) => <Cell key={`${y}-${x}`} isLit={cell} flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)} />)}
          </tr>)}
      </tbody>);
  }

}


export default Board;
