const Screen = require("./screen");
const { MESSAGE_INVALID_CURSOR_MOVE } = require("../constants/constants.js");

/**
 * Cursor class
 * @property {number} row - current row location of the cursor
 * @property {number} col - current column location of the cursor
 */
class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.row = 0;
    this.col = 0;
    this.gridColor = 'black';
    this.cursorColor = 'white';
    this.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    Screen.render();
    Screen.printCommands();
  }

  logCursorErrorMessage = () => {
    console.log(MESSAGE_INVALID_CURSOR_MOVE);
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundColor();
      this.row--;
      this.setBackgroundColor();
    } else {
      this.logCursorErrorMessage();
    }
  }

  down() {
    if (this.row < this.numRows - 1) {
      this.resetBackgroundColor();
      this.row++;
      this.setBackgroundColor();
    } else {
      this.logCursorErrorMessage();
    }
  }

  left() {
    if (this.col > 0) {
      this.resetBackgroundColor();
      this.col--;
      this.setBackgroundColor();
    } else {
      this.logCursorErrorMessage();
    }
  }

  right() {
    if (this.col < this.numCols - 1) {
      this.resetBackgroundColor();
      this.col++;
      this.setBackgroundColor();
    } else {
      this.logCursorErrorMessage();
    }
  }

  /* TODO: 
     figure out why helper function like move() below causes errors
     to reduce code in up, down, left, right
  
     move = (rowOrCol, increment) => {
      this.resetBackgroundColor();
      rowOrCol += increment;
      this.setBackgroundColor();
     }
  */
}

module.exports = Cursor;
