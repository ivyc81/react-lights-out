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
    chanceLightStartsOn: 0,
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
    // let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      // FINISHED: flip this cell and the cells around it

      //   if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      //     board[y][x] = !board[y][x];
      //   }
      // }
      let newBoard = board.map((row, idx) =>
        idx >= y - 1 && idx <= y + 1
          ? row.map((isLit, col) =>
            {if ((idx === y-1 || idx === y+1) && col ===x){
              return !isLit;
            } else if (idx === y && col >= x-1 && col <= x+1) {
              return !isLit;
            } else {
              return isLit;
            }})
          : row)

      
      return newBoard
    }

    function checkWin(board){
      let win = board.every( row => row.every ( lit => lit === false));
      return win;
    }

    let newBoard = flipCell(y, x);

    this.setState({board: newBoard,
                   hasWon: checkWin(newBoard)});
    
  }

  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    return (this.state.hasWon ?
      <p>YOU WON!</p>
      :
      <div>
        {this.state.board.map((row, y) =>
          <div key = {y}>
            {row.map((cell, x) => <Cell key={`${y}-${x}`} isLit={cell} flipCellsAroundMe={() => this.flipCellsAround(`${y}-${x}`)} />)}
          </div>)}
      </div>);
  }

}


export default Board;
