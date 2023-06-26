const Screen = require("./screen");

class Cursor {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'magenta';

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
    console.log("The cursor can't move that way, try another direction.");
  }

  // TODO - figure out how to use a helper function like move below (still buggy)
  // to reduce code in up, down, left, right
  //
  // move = (rowOrCol, increment) => {
  //   this.resetBackgroundColor();
  //   rowOrCol += increment;
  //   this.setBackgroundColor();
  // }

  // LONG WAY
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
}

module.exports = Cursor;
